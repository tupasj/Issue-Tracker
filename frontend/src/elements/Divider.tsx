import styled from 'styled-components';

const Container = styled.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.5);
  margin-top: 4px;
  margin-bottom: 4px;
`;

export const Divider = () => {
  return <Container />;
};
