import { Router } from 'express';
import UserAuthController from '../../controllers/auth/UserAuthController.js';
import UserAuthValidator from '../../validators/auth/UserAuthValidator.js';
import validate from '../../validators/validate.js';
import Authenticator from '../../middlewares/Authenticator.js';

const router = Router();
const AuthController = new UserAuthController();

router.post(
  '/register',
  UserAuthValidator.Register(),
  validate,
  AuthController.Register.bind(AuthController)
);

router.post(
  '/login',
  UserAuthValidator.Login(),
  validate,
  AuthController.Login.bind(AuthController)
);

router.post(
  '/logout',
  Authenticator.VerifyToken,
  AuthController.Logout.bind(AuthController)
);

export default router;
