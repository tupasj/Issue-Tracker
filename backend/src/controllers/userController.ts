import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { UserDisplayName } from '../models/UserDisplayName';
import {
  generateTokens,
  refreshToken,
  deleteRefreshToken,
} from '../utils/jwtUtils';
import { DBCreateUser, DBGetUser } from '../utils/database/userQueries';
import {
  DBCreateUserDisplayName,
  DBUpdateUserDisplayName,
} from '../utils/database/userDisplayNameQueries';

const getUserInfo = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const user = await DBGetUser(email);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const createUser = async (req: Request, res: Response) => {
  const { email, password, first_name, last_name } = req.body;
  let user: any;

  try {
    user = await DBCreateUser(email, password, first_name, last_name);
    const tokens = generateTokens({ email: email });
    res.cookie('jwt', tokens, { httpOnly: true });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }

  try {
    const userDisplayName = await DBCreateUserDisplayName(
      first_name,
      last_name
    );
    user.setUserDisplayName(userDisplayName);
    res.status(201).end();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await DBGetUser(email);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const tokens = generateTokens({ email: email });
      const userInfoObject = {
        email,
        tokens,
      };
      res.cookie('jwt', tokens, { httpOnly: true });
      res.status(200).json(userInfoObject);
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getUserProfileImage = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const user: any = await User.findOne({ where: { email } });
    res.status(200).json(user.profile_image);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getUserDisplayName = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const user: any = await UserDisplayName.findOne({
      where: { userEmail: email },
    });
    res.status(200).json(user.display_name);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const updateUserProfileImage = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { imageURL } = req.body;

  try {
    await User.update({ profile_image: imageURL }, { where: { email } });
    res.status(200).end();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const updateUserDisplayName = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { displayNameSelection } = req.body;

  try {
    await DBUpdateUserDisplayName(email, displayNameSelection);
    res.status(200).end();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const updateUserUsername = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { username } = req.body;

  try {
    await User.update({ username }, { where: { email } });
    res.status(200).end();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const updateUserPhoneNumber = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { phoneNumber } = req.body;

  try {
    await User.update({ phone_number: phoneNumber }, { where: { email } });
    res.status(200);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const updateUserStatus = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { status } = req.body;

  try {
    await User.update({ status }, { where: { email } });
    res.status(200).end();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    await User.destroy({ where: { email } });
    res.status(200).end();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req: Request, res: Response) => {
  deleteRefreshToken(req, res);
};

const refreshUserToken = async (req: Request, res: Response) => {
  refreshToken(req, res);
};

export {
  getUserInfo,
  createUser,
  loginUser,
  getUserProfileImage,
  getUserDisplayName,
  updateUserProfileImage,
  updateUserDisplayName,
  updateUserUsername,
  updateUserPhoneNumber,
  updateUserStatus,
  deleteUser,
  logoutUser,
  refreshUserToken,
};
