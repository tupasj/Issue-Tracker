import { createContext, useContext } from 'react';

export interface UserContextInterface {
  email: any;
  displayName: string;
  setDisplayName: React.Dispatch<React.SetStateAction<string>>;
  profileImage: string;
  setProfileImage: React.Dispatch<React.SetStateAction<string>>;
  status: any;
  setStatus: React.Dispatch<React.SetStateAction<any>>;
}

export const UserContext = createContext<UserContextInterface | null>(null);

export const userContext = () => {
  const userCtx = useContext(UserContext);

  if (!userCtx) {
    throw new Error('userContext has to be used within <UserContext.Provider>');
  }

  return userCtx;
};
