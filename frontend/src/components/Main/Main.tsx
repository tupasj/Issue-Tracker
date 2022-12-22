import styled from 'styled-components';

const Container = styled.main`
  position: fixed;
  left: 200px;
  width: 100%;
  height: 100%;
  padding: 42px;
`;

export const Main = () => {
  return (
    <Container>
      <p>main</p>
    </Container>
  );
};
