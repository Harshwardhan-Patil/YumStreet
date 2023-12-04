import Cookies from "js-cookie"
import { createContext, useContext, useEffect, useState } from "react";
import socketIo from 'socket.io-client'


const getSocket = () => {
    const token = Cookies.get('token') || Cookies.get('accessToken');
    return socketIo(import.meta.env.VITE_SOCKET_URI, {
        withCredentials: true,
        auth: { token }
    })
}

const SocketContext = createContext({ socket: null });

const useSocket = () => useContext(SocketContext);

function SocketProvider({ children }) {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(getSocket());
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketProvider, useSocket };