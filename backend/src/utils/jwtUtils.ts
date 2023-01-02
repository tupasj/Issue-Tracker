import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { storeRefreshToken } from './mongoDbUtils';
import refreshTokenModel from '../models/refreshToken';

const generateAccessToken = (userEmail: object): string | undefined => {
  try {
    return jwt.sign(userEmail, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: '6h',
    });
  } catch (error: any) {
    console.log('generateAccessToken error: ', error.message);
  }
};

const generateRefreshToken = (userEmail: object): string | undefined => {
  try {
    return jwt.sign(userEmail, process.env.REFRESH_TOKEN_SECRET as string);
  } catch (error: any) {
    console.log('generateRefreshToken error: ', error.message);
  }
};

const refreshToken = (req: Request, res: Response) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  // if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      //   const accessToken = generateAccessToken({ name: user.name });
      // res.cookie('jwt', { accessToken }, { httpOnly: true });
      //   res.json({ accessToken: accessToken });
    }
  );
};

const deleteRefreshToken = async (req: Request, res: Response) => {
  try {
    const refreshTokenId = req.cookies.jwt.refreshToken;
    await refreshTokenModel.deleteOne({ identifier: refreshTokenId });
    res.clearCookie('jwt');
    res.status(200).end();
  } catch (error: any) {
    console.log('deleteRefreshTokenError: ', error);
    res.status(500);
  }
};

const generateTokens = (userEmail: object) => {
  const accessToken = generateAccessToken(userEmail);
  const refreshToken = generateRefreshToken(userEmail);
  if (typeof refreshToken === 'string') {
    storeRefreshToken(refreshToken);
  }

  const tokens = { accessToken: accessToken, refreshToken: refreshToken };
  return tokens;
};

export { refreshToken, deleteRefreshToken, generateTokens };
