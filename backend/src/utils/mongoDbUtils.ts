import mongoose from 'mongoose';
import refreshTokenModel from '../models/refreshToken';

const connectToMongoDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    const connnectionResponse = await mongoose.connect(
      process.env.MONGO_URI as string
    );
    console.log(
      // @ts-ignore
      `MongoDB connected: ${connnectionResponse.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log('Failed to connect to MongoDB: ', error);
    process.exit(1);
  }
};

const storeRefreshToken = async (refreshToken: string) => {
  try {
    const newRefreshToken = new refreshTokenModel({
      identifier: refreshToken,
    });
    await newRefreshToken.save();
  } catch (error: any) {
    console.log('storeRefreshToken error: ', error);
  }
};

export { connectToMongoDB, storeRefreshToken };
