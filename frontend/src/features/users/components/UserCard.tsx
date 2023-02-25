import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 8px;
  padding: 14px;
  border-radius: 4px;
  background-color: var(--white);
  cursor: pointer;
  &:hover {
    background-color: var(--extra-light-gray);
  }
`;

const Title = styled.div`
  font-weight: 600;
  line-height: 1.5;
  cursor: pointer;
  &:hover {
    color: var(--blue);
  }
`;

export const UserCard = () => {
  return (
    <Container>
      <Title>User name</Title>
    </Container>
  );
};
