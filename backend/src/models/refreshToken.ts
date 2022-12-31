import mongoose from 'mongoose';

// @ts-ignore
const refreshTokenSchema = mongoose.Schema(
  {
    identifier: String,
  },
  {
    collection: 'jwtRefreshTokens',
  }
);

const model = mongoose.model('refreshToken', refreshTokenSchema);

export default model;
