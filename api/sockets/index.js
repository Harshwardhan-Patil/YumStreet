import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiErrors.js';
import { UserRepository } from '../database/index.js';
import { EventEnum } from '../constants.js';
import { ACCESS_TOKEN_SECRET } from '../config/index.js';

class Io {
  static initializeSocketIO = (io) => {
    return io.on('connection', async (socket) => {
      try {
        // parse the cookies from the handshake headers (This is only possible if client has `withCredentials: true`)
        const cookies = cookie.parse(socket.handshake.headers?.cookie || '');
        let token = cookies?.accessToken; // get the accessToken
        if (!token) {
          token = socket.handshake.auth?.token;
        }

        if (!token) {
          throw new ApiError(401, 'Un-authorized handshake. Token is missing');
        }

        const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
        const userDb = new UserRepository();
        let user = await userDb.FindUserById(decodedToken?.id, {
          excludeAttributes: ['password'],
        });
        user = user.dataValues;
        if (!user) {
          throw new ApiError(401, 'Un-authorized handshake. Token is invalid');
        }
        // eslint-disable-next-line no-param-reassign
        socket.user = user;

        socket.join(user.id.toString());
        socket.emit(EventEnum.CONNECTED_EVENT);

        socket.on(EventEnum.DISCONNECT_EVENT, () => {
          if (socket.user?.id) {
            socket.leave(socket.user.id);
          }
        });
      } catch (error) {
        socket.emit(
          EventEnum.SOCKET_ERROR_EVENT,
          error?.message ||
          'Something went wrong while connecting to the socket.'
        );
      }
    });
  };

  static emitSocketEvent = ({ req, roomId, event, payload }) => {
    req.app.get('io').in(roomId).emit(event, payload);
  };
}

export default Io;
