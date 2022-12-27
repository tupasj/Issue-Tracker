import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 4px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  &:hover {
    box-shadow: 0px 0px 1px 2px #59b1e6;
  }
`;

export const Project = () => {
  return <Container>Project name</Container>;
};
