import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 4px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  &:hover {
    box-shadow: 0px 0px 1px 2px blue;
  }
`;

export const Project = () => {
  return <Container>Project name Project name Project name</Container>;
};
