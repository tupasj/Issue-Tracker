import bcrypt from 'bcrypt';
import { User } from '../../models/User';

const DBCreateUser = async (
  email: string,
  password: string,
  first_name: string,
  last_name: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword,
    first_name,
    last_name,
  });
  return user;
};

const DBGetUser = async (email: string) => {
  const userInfo: any = await User.findOne({
    where: { email },
  });

  if (!userInfo) {
    throw new Error('Invalid credentials');
  }

  return userInfo;
};

export { DBCreateUser, DBGetUser };
