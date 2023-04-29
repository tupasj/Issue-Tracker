import styled from 'styled-components';
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
  return (
    <Container>
      <SearchbarContainer>
        <UserSearchbar />
      </SearchbarContainer>
      <UserCards />
    </Container>
  );
};
