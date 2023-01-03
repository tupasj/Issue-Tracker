import express from 'express';
import {
  getUserInfo,
  createUser,
  loginUser,
  logoutUser,
  refreshUserToken,
} from '../controllers/userController';

const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').delete(logoutUser);
router.route('/refreshToken').post(refreshUserToken);
router.route('/email=:email').get(getUserInfo);

export default router;
