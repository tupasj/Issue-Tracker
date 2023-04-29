import styled from 'styled-components';
import { projectsContext } from '@/context';
import { useUsers } from '@/hooks';
import { UserCard } from './UserCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  height: 100%;
  overflow: scroll;
`;

export const UserCards = () => {
  const { currentProject } = projectsContext();
  const users = useUsers(currentProject);

  return (
    <Container>
      {users.users.map((user: any) => (
        <UserCard key={user.email} user={user} />
      ))}
    </Container>
  );
};
