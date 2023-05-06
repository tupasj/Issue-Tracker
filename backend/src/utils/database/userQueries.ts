import bcrypt from 'bcrypt';
import { User } from '../../models/User';
import { UserDisplayName } from '../../models/UserDisplayName';

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

const DBCreateUserDisplayName = async (
  first_name: string,
  last_name: string
) => {
  if (!first_name || !last_name) {
    throw new Error('Missing first_name and/or last_name');
  }

  let userDisplayName;
  userDisplayName = await UserDisplayName.create({
    display_name: `${first_name} ${last_name}`,
  });

  return userDisplayName;
};

const DBGetUserInfo = async (email: string) => {
  const userInfo: any = await User.findOne({
    where: { email },
    attributes: { exclude: ['password'] },
  });

  if (!userInfo) {
    throw new Error('Invalid credentials');
  }

  return userInfo;
};

const DBUpdateUserDisplayName = async (
  email: string,
  displayNameSelection: string
) => {
  const user: any = await User.findOne({ where: { email } });

  if (displayNameSelection === 'username') {
    await UserDisplayName.update(
      { display_name: user.username },
      { where: { userEmail: email } }
    );
  } else if (displayNameSelection === 'name') {
    const fullName = `${user.first_name} ${user.last_name}`;
    await UserDisplayName.update(
      { display_name: fullName },
      { where: { userEmail: email } }
    );
  }
};

export {
  DBCreateUser,
  DBCreateUserDisplayName,
  DBGetUserInfo,
  DBUpdateUserDisplayName,
};
