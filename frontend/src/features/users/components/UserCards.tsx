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

type Props = {
  users: any[];
  setUsers: React.Dispatch<React.SetStateAction<any>>;
};

export const UserCards = ({ users, setUsers }: Props) => {
  return (
    <Container>
      {users &&
        users.map((user: any) => <UserCard key={user.email} user={user} setUsers={setUsers} />)}
    </Container>
  );
};
