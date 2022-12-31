import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { storeRefreshToken } from './mongoDbUtils';

let refreshTokens: any = [];

const generateAccessToken = (userEmail: object): string | undefined => {
  try {
    // @ts-ignore
    return jwt.sign(userEmail, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '12h',
    });
  } catch (error: any) {
    console.log('generateAccessToken error: ', error.message);
  }
};

const generateRefreshToken = (userEmail: object): string | undefined => {
  try {
    // @ts-ignore
    return jwt.sign(userEmail, process.env.REFRESH_TOKEN_SECRET);
  } catch (error: any) {
    console.log('generateRefreshToken error: ', error.message);
  }
};

const refreshToken = (req: Request, res: Response) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(
    refreshToken,
    // @ts-ignore
    process.env.REFRESH_TOKEN_SECRET,
    (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      //   const accessToken = generateAccessToken({ name: user.name });
      //   res.json({ accessToken: accessToken });
    }
  );
};

const deleteRefreshToken = (req: Request, res: Response) => {
  // @ts-ignore
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
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
