import styled from 'styled-components';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { userContext, projectsContext } from '@/context';
import { joinProject, deleteProject } from '@/features/projects';
import { Input } from '@/components/Form';

const SubmitButton = styled.button`
  display: block;
  margin-top: 28px;
  padding: 6px;
  width: 150px;
  border-radius: 4px;
  background-color: var(--green);
  color: var(--white);
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 200ms;
  &:hover {
    background-color: var(--dark-green);
  }
`;

const H2 = styled.h2`
  padding-top: 22px;
  font-weight: 600;
`;

const H3 = styled.h3`
  font-style: italic;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: start;
`;

const ProjectCode = styled.div`
  font-size: 0.75rem;
  color: var(--medium-gray);
`;

interface FormValues {
  project_code?: string;
  project_name?: string;
  profile_image?: string;
  display_name?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: number | null;
}

export const Settings = () => {
  const [validCodeText, setValidCodeText] = useState('');
  const [validNameText, setValidNameText] = useState('');
  const { email } = userContext();
  const { projects, setProjects, currentProject, setCurrentProject } = projectsContext();

  const initialValues = {
    project_code: '',
    project_name: '',
    profile_image: '',
    display_name: '',
    username: '',
    first_name: '',
    last_name: '',
    phone_number: '' as any,
  };

  const validationSchema = Yup.object({});

  const submitProjectCode = async (code: string) => {
    if (code == undefined) {
      return;
    }

    const projectJoined = await joinProject(code, email);

    if (projectJoined) {
      setValidCodeText(`Successfully joined project '${projectJoined.name}'.`);
      setCurrentProject(projectJoined);
    } else if (code !== '') {
      return 'Invalid code';
    }
  };

  const submitProjectName = async (projectName: string) => {
    const projectToLeave = projects.filter((project: any) => project.name == projectName);
    if (projectName !== '') {
      const updatedProjects = await deleteProject(projectToLeave, email);
      setProjects(updatedProjects);
      setValidNameText(`Left project '${projectToLeave[0].name}'.`);
    } else if (projectToLeave.length === 0) {
      return `Could not find a project named '${projectName}' to delete.`;
    }
  };

  const handleSubmit = (values: FormValues) => {};

  let validationActive = false;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={validationActive}
      validateOnChange={validationActive}
      onSubmit={handleSubmit}
    >
      <StyledForm>
        <H2>Projects</H2>
        <ProjectCode>Current project code: {currentProject && currentProject.code}</ProjectCode>
        <H3>Join a project</H3>
        <Input
          stacked={false}
          type="text"
          id="code"
          name="code"
          placeholder="Enter project code..."
          validate={submitProjectCode}
          successText={validCodeText}
        />
        <H3>Leave a project</H3>
        <Input
          stacked={false}
          type="text"
          id="project_name"
          name="project_name"
          placeholder="Enter project name..."
          validate={submitProjectName}
          successText={validNameText}
        />
        <H2>Personalization</H2>
        <H3>Change profile picture</H3>
        <input type="file" id="profile_image" name="profile_image" accept="image/png, image/jpeg" />
        <H3>Change display name</H3>
        <div>
          <input type="radio" id="username" name="display_name" value="username" />
          <label htmlFor="username">Username</label>
          <input type="radio" id="name" name="display_name" value="name" />
          <label htmlFor="name">Name</label>
        </div>
        <H2>Add additional info</H2>
        <H3>Username</H3>
        <Input stacked={false} type="text" id="username" name="username" placeholder="Username" />
        <H3>Phone number</H3>
        <Input
          stacked={false}
          type="tel"
          id="phone_number"
          name="phone_number"
          placeholder="123-45-678"
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
        />
        <SubmitButton type="submit">Save changes</SubmitButton>
      </StyledForm>
    </Formik>
  );
};
