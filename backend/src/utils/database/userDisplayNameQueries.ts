import { UserDisplayName } from '../../models/UserDisplayName';
import { User } from '../../models/User';

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

const DBGetUserDisplayName = async (email: string) => {
  const userDisplayName: any = await UserDisplayName.findOne({
    where: { userEmail: email },
  });

  return userDisplayName;
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
  DBCreateUserDisplayName,
  DBUpdateUserDisplayName,
  DBGetUserDisplayName,
};
