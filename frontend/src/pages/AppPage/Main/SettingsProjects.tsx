import styled from 'styled-components';
import { useState } from 'react';
import { userContext, projectsContext } from '@/context';
import { Input } from '@/components/Form';
import { joinProject, deleteProject } from '@/features/projects';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const H2 = styled.h2`
  padding-top: 22px;
  font-weight: 600;
`;

const H3 = styled.h3`
  font-style: italic;
`;

const ProjectCode = styled.div`
  font-size: 0.75rem;
  color: var(--medium-gray);
`;

const StyledInput = styled(Input)`
  padding-left: 0px !important;
  padding-right: 0px !important;
`;

export const SettingsProjects = () => {
  const [validCodeText, setValidCodeText] = useState('');
  const [validNameText, setValidNameText] = useState('');
  const { email } = userContext();
  const { projects, setProjects, currentProject, setCurrentProject } = projectsContext();

  const submitProjectCode = async (code: string) => {
    if (code == undefined) {
      return;
    }

    const projectJoined = await joinProject(code, email);

    if (projectJoined) {
      setValidCodeText(`Successfully joined project '${projectJoined.name}'.`);
      setCurrentProject(projectJoined);
      setProjects([...projects, projectJoined]);
    } else if (code !== '') {
      return 'Invalid code';
    }
  };

  const submitProjectName = async (projectName: string) => {
    const projectToLeave = projects.filter((project: any) => project.name == projectName);

    if (projectName !== '' && projectToLeave[0]) {
      const updatedProjects = await deleteProject(projectToLeave, email);
      setProjects(updatedProjects);
      setValidNameText(`Left project '${projectToLeave[0].name}'.`);
    } else if (projectName !== '') {
      return `Could not find a project named '${projectName}' to delete.`;
    }
  };

  return (
    <Container>
      <H2>Projects</H2>
      <ProjectCode>Current project code: {currentProject && currentProject.code}</ProjectCode>
      <H3>Join a project</H3>
      <StyledInput
        stacked={false}
        type="text"
        id="code"
        name="code"
        placeholder="Enter project code..."
        validate={submitProjectCode}
        successText={validCodeText}
      />
      <H3>Leave a project</H3>
      <StyledInput
        stacked={false}
        type="text"
        id="project_name"
        name="project_name"
        placeholder="Enter project name..."
        validate={submitProjectName}
        successText={validNameText}
      />
    </Container>
  );
};
