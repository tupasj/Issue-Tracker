import express from 'express';
import {
  getUserInfo,
  createUser,
  loginUser,
  deleteUser,
  logoutUser,
  editUserInfo,
  refreshUserToken,
} from '../controllers/userController';

const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').delete(logoutUser);
router.route('/refreshToken').post(refreshUserToken);
router.route('/email=:email/attributes?').patch(editUserInfo);
router.route('/email=:email').get(getUserInfo);
router.route('/delete/email=:email').delete(deleteUser);

export default router;
