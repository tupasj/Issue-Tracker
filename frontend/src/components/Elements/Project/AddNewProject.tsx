import styled from 'styled-components';
import { useState, useContext } from 'react';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserContext, ProjectsContext } from '@/context';

const Container = styled.div`
  display: flex;
`;

const NewProjectInput = styled.input`
  flex-grow: 1;
  border-bottom-left-radius: 2px;
  border-width: 1px;
  border-top-right-radius: 2px;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 1.25rem;
  padding: 4px;
`;

export const AddNewProject = () => {
  const [projectName, setProjectName] = useState('');
  const userCtx = useContext(UserContext);
  const { setProjects } = useContext(ProjectsContext) as any;

  const addProject = async () => {
    try {
      const projectInfo = { projectName: projectName, email: userCtx?.email };
      const updatedProjects = await axiosInstance.post('/projects', projectInfo);
      setProjects(updatedProjects.data);
    } catch (error: any) {
      axiosErrorHandler(error);
    }
  };

  return (
    <Container>
      <NewProjectInput
        type="text"
        placeholder="Create new project..."
        onChange={(e) => setProjectName(e.target.value)}
      />
      <StyledFontAwesomeIcon icon={faPlus} onClick={addProject} />
    </Container>
  );
};
