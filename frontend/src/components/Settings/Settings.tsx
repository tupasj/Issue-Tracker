import styled from 'styled-components';
import { useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { UserContext, ProjectsContext } from '@/context';
import { Input } from '@/elements/Form';
import { H2, H3 } from '@/elements/Text';

const SubmitButton = styled.button`
  display: block;
  margin-top: 28px;
  padding: 6px;
  width: 150px;
  border-radius: 4px;
  background-color: #33a83a;
  color: #fff;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 200ms;
  &:hover {
    background-color: #238629;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: start;
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
  const userCtx = useContext(UserContext);
  const { projects, setProjects } = useContext(ProjectsContext) as any;

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

  const submitCode = async (code: string) => {
    if (code == undefined) {
      return;
    }

    try {
      const response = await axiosInstance.patch(
        `/user/email=${userCtx?.email}/attributes?project_codes=${code}`
      );
      setValidCodeText(`Successfully joined project '${response.data.name}'.`);
      return;
    } catch (error: any) {
      axiosErrorHandler(error);
    }
    return 'Invalid code';
  };

  const submitProjectName = async (projectName: string) => {
    try {
      const projectToLeave = projects.filter((project: any) => project.name == projectName);
      if (projectToLeave.length === 0) {
        return `Could not find a project named '${projectName}' to delete.`;
      }
      const updatedProjects = await axiosInstance.delete(
        `/projects/code=${projectToLeave[0].code}/user/email=${userCtx?.email}`
      );
      setProjects(updatedProjects.data);
      setValidNameText(`Left project '${projectToLeave[0].name}'.`);
    } catch (error: any) {
      axiosErrorHandler(error);
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
        <H3>Join a project</H3>
        <Input
          stacked={false}
          type="text"
          id="code"
          name="code"
          placeholder="Enter project code..."
          validate={submitCode}
          successText={validCodeText}
        />
        <H3>Leave a project</H3>
        <Input
          stacked={false}
          type="text"
          id="project_name"
          name="project_name"
          placeholder="Enter project name.."
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
