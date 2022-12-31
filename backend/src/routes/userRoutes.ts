import express from 'express';
import {
  getUser,
  createUser,
  loginUser,
  logoutUser,
  refreshUserToken,
} from '../controllers/userController';

const router = express.Router();

router.route('/').get(getUser);
router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').delete(logoutUser);
router.route('/refreshToken').post(refreshUserToken);

export default router;
