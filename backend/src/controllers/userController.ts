import { Request, Response } from 'express';
import { db, QueryTypes } from '../config/database';
import { User } from '../models/User';
import { UserDisplayName } from '../models/UserDisplayName';
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
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    res.status(200).json(user);
  } catch (error: any) {
    console.log('error: ', error);
    res.status(400).json({ message: error.message });
  }
};

const createUser = async (req: Request, res: Response) => {
  const { email, password, first_name, last_name } = req.body;

  let userDisplayName;
  try {
    userDisplayName = await UserDisplayName.create({
      display_name: `${first_name} ${last_name}`,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: any = await User.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
    });
    user.setUserDisplayName(userDisplayName);
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
  deleteUser,
  logoutUser,
  editUserInfo,
  refreshUserToken,
};
