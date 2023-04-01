import express from 'express';
import {
  getUserInfo,
  createUser,
  loginUser,
  getUserProfileImage,
  updateUserProfileImage,
  updateUserDisplayName,
  updateUserUsername,
  updateUserPhoneNumber,
  deleteUser,
  logoutUser,
  refreshUserToken,
} from '../controllers/userController';

const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').delete(logoutUser);
router.route('/refreshToken').post(refreshUserToken);
router.route('/email=:email').get(getUserInfo);
router
  .route('/email=:email/profileImage')
  .get(getUserProfileImage)
  .patch(updateUserProfileImage);
router.route('/email=:email/displayName').patch(updateUserDisplayName);
router.route('/email=:email/username').patch(updateUserUsername);
router.route('/email=:email/phoneNumber').patch(updateUserPhoneNumber);
router.route('/delete/email=:email').delete(deleteUser);

export default router;
