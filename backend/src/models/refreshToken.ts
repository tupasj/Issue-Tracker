import mongoose from 'mongoose';

// @ts-ignore
const refreshTokenSchema = new mongoose.Schema(
  {
    identifier: String,
  },
  {
    collection: 'jwtRefreshTokens',
  }
);

const model = mongoose.model('refreshToken', refreshTokenSchema);

export default model;
