import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { projectsContext } from '@/context';
import { getUsers } from '../api';
import { UserCards } from './UserCards';
import { UserSearchbar } from './UserSearchbar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 6px;
  background-color: #f7faf9;
`;

const SearchbarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 4px;
`;

export const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const { currentProject } = projectsContext();

  useEffect(() => {
    const fetchUsers = async () => {
      const retrievedUsers = await getUsers(currentProject);
      setUsers(retrievedUsers);
    };

    fetchUsers();
  }, []);

  return (
    <Container>
      <SearchbarContainer>
        <UserSearchbar users={users} setUsers={setUsers} currentProject={currentProject} />
      </SearchbarContainer>
      <UserCards users={users} />
    </Container>
  );
};
