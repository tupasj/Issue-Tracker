import styled from 'styled-components';

const Container = styled.header`
  grid-area: header;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.15);
`;

export const sum = (...numbers: number[]) => {
  return numbers.reduce((total, number) => total + number, 0);
};

export const Header = () => {
  return <Container>Header</Container>;
};
