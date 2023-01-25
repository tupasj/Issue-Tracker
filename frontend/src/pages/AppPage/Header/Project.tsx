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

type Props = {
  project: any;
  setCurrentProject: React.Dispatch<React.SetStateAction<any>>;
};

export const Project = ({ project, setCurrentProject }: Props) => {
  return (
    <Container onClick={() => setCurrentProject(project)}>
      <div>{project.name}</div>
    </Container>
  );
};
