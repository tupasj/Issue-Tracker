import express from 'express';
import {
  getUserInfo,
  createUser,
  loginUser,
  updateUserProfileImage,
  updateUserDisplayName,
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
router.route('/email=:email/profileImage').patch(updateUserProfileImage);
router.route('/email=:email/displayName').patch(updateUserDisplayName);
router.route('/delete/email=:email').delete(deleteUser);

export default router;
