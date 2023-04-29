import { useState, useEffect } from 'react';
import { getUsers } from '@/features/users';

export const useUsers = (currentProject: any) => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers(currentProject);
      setUsers(users);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (users[0]) {
      setIsLoading(false);

      console.log('users: ', users);
    }
  }, [users]);

  return { users, isLoading };
};
