import { useState, useEffect } from 'react';
import { getUserInfo } from '@/features/users';

export const useUserInfo = (userEmail: string) => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo(userEmail);
      setUserInfo(userInfo);
    };

    fetchUserInfo();
  }, []);

  return userInfo;
};
