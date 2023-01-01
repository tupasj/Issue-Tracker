import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import {
  generateTokens,
  refreshToken,
  deleteRefreshToken,
} from '../utils/jwtUtils';

const getUserInfo = async (req: Request, res: Response) => {
  console.log('req.params.email: ', req.params.email);
  console.log('req.params.query', req.query);
  res.status(200).json(req.params.email);

  // try {
  //   const user: any = await User.findOne({
  //     where: { email },
  //   });
  //   if (!user) {
  //     throw new Error('Invalid credentials');
  //   }

  //   res.status(200).json(user.requestedAttribute);
  // } catch (error: any) {
  //   console.log('error: ', error);
  //   res.status(400).json({ message: error.message });
  // }
};

const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      password: hashedPassword,
    });
    res.status(201);
  } catch (error: any) {
    console.log('error: ', error.message);
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: any = await User.findOne({
      where: { email },
    });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const userInfo = {
      email: user.email,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      profile_image: user.profile_image,
      project_ids: user.project_ids,
      status: user.status,
      type: user.type,
    };

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const tokens = generateTokens({ email: email });
      const userInfoObject = {
        userInfo,
        tokens,
      };
      res.status(200).json(userInfoObject);
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const logoutUser = async (req: Request, res: Response) => {
  // Response should be http status code 200
  deleteRefreshToken(req, res);
};

const refreshUserToken = async (req: Request, res: Response) => {
  // Response should be http status code 200
  refreshToken(req, res);
};

export { getUserInfo, createUser, loginUser, logoutUser, refreshUserToken };
