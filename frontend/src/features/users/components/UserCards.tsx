import styled from 'styled-components';
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
  return (
    <Container>
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
    </Container>
  );
};
