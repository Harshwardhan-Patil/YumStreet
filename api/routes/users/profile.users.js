import { Router } from 'express';
import UserProfileController from '../../controllers/user/UserProfileController.js';
import Authenticator from '../../middlewares/Authenticator.js';
import UserProfileValidator from '../../validators/users/UserProfileValidator.js';
import validate from '../../validators/validate.js';
import upload from '../../middlewares/Multer.js';

const router = Router();
const UserProfile = new UserProfileController();

router.use(Authenticator.VerifyToken);

// api/users/:userId/profile/*

router
  .route('/')
  .get(UserProfile.GetUserProfile.bind(UserProfile))
  .put(
    UserProfileValidator.UpdateProfile(),
    validate,
    UserProfile.UpdateUserProfile.bind(UserProfile)
  );

router
  .route('/image')
  .put(
    upload.single('avatar'),
    UserProfile.UpdateUserProfileImage.bind(UserProfile)
  );

export default router;
