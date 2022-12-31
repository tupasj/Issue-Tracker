import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import {
  generateTokens,
  refreshToken,
  deleteRefreshToken,
} from '../utils/jwtUtils';

interface UserInterface {
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
}

const getUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ name: 'john' });
  } catch (error: any) {
    console.log('error: ', error);
    res.status(400).json({ message: error.message });
  }
};

const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error: any) {
    console.log('error: ', error.message);
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: any = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const tokens = generateTokens({ email: email });
      const userInfoObject = {
        userInfo: user,
        tokens: tokens,
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

export { getUser, createUser, loginUser, logoutUser, refreshUserToken };
