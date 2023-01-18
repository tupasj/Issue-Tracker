import { Request, Response } from 'express';
import { db, QueryTypes } from '../config/database';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import {
  generateTokens,
  refreshToken,
  deleteRefreshToken,
} from '../utils/jwtUtils';

const getUserInfo = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const user: any = await User.findOne({
      where: { email },
    });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const userInfo = {
      email: user.email,
      current_project: user.current_project,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      profile_image: user.profile_image,
      project_codes: user.project_codes,
      status: user.status,
      type: user.type,
    };

    res.status(200).json(userInfo);
  } catch (error: any) {
    console.log('error: ', error);
    res.status(400).json({ message: error.message });
  }
};

const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      password: hashedPassword,
    });
    const tokens = generateTokens({ email: email });
    res.cookie('jwt', tokens, { httpOnly: true });
    res.status(201);
  } catch (error: any) {
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

const editUserInfo = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const query = req.query;

    //  Get DB user
    const dbUser: any = await User.findOne({
      where: { email },
    });

    // Iterate through req.query
    for (const queryProperty in query) {
      const queryPropertyName = queryProperty;
      let queryPropertyValue = query[queryProperty];

      // For each req.query property, if name matches property name in db, then update the db value
      for (const dbUserProperty in dbUser.dataValues) {
        const dbUserPropertyName = dbUserProperty;
        let dbUserPropertyValue = dbUser.dataValues[dbUserProperty];

        if (dbUserPropertyName === queryPropertyName) {
          if (Array.isArray(dbUserPropertyValue)) {
            console.log('update array');
            await db.query(
              `UPDATE users SET project_codes = project_codes || '{${queryPropertyValue}}' WHERE email='${email}'`,
              {
                type: QueryTypes.UPDATE,
              }
            );
          } else {
            console.log('update non-array');
            await db.query(
              `UPDATE users SET ${dbUserPropertyName}='${queryPropertyValue}' WHERE email='${email}'`,
              {
                type: QueryTypes.UPDATE,
              }
            );
          }
          break;
        }
      }
    }

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
  logoutUser,
  editUserInfo,
  refreshUserToken,
  deleteUser,
};
