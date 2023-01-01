import { createContext } from 'react';

export interface UserContextInterface {
  email: string | null;
}

export const UserContext = createContext<UserContextInterface | null>(null);
