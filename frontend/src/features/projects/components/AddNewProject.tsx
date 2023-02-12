import styled from 'styled-components';
import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { userContext, ProjectsContext } from '@/context';
import { createProject } from '../api';

const Container = styled.div`
  display: flex;
`;

const NewProjectInput = styled.input`
  flex-grow: 1;
  border-width: 1px;
  border-radius: 4px;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 1.25rem;
  padding: 4px;
`;

export const AddNewProject = () => {
  const [projectNameInput, setProjectNameInput] = useState('');
  const { email } = userContext();
  const { setProjects } = useContext(ProjectsContext) as any;

  const handleCreateProject = async () => {
    const updatedProjects = await createProject(projectNameInput, email);
    setProjects(updatedProjects);
  };

  return (
    <Container>
      <NewProjectInput
        type="text"
        placeholder="Create new project..."
        onChange={(e) => setProjectNameInput(e.target.value)}
      />
      <StyledFontAwesomeIcon icon={faPlus} onClick={handleCreateProject} />
    </Container>
  );
};
