import { useState, useEffect } from 'react';
import { getUserInfo, getUserDisplayName } from '@/features/users';
import { getUserStatusColor } from '@/utils/userUtils';

export const useUserInfo = (userEmail: string) => {
  const [fullUserInfo, setFullUserInfo] = useState<any | null>(null);
  const [userInfo, setUserInfo] = useState<any | null>(null);
  const [userDisplayName, setUserDisplayName] = useState<any | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo(userEmail);
      setUserInfo(userInfo);
    };
    const fetchUserDisplayName = async () => {
      const userDisplayName = await getUserDisplayName(userEmail);
      setUserDisplayName({ displayName: userDisplayName });
    };

    fetchUserInfo();
    fetchUserDisplayName();
  }, []);

  useEffect(() => {
    if (userInfo && userDisplayName) {
      const userStatusColor = getUserStatusColor(userInfo.status);
      const status = { status: userInfo.status, color: userStatusColor };
      setFullUserInfo({ ...userInfo, ...userDisplayName, status });
    }
  }, [userInfo, userDisplayName]);

  return fullUserInfo;
};
