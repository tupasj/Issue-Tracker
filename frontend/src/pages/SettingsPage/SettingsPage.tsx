import styled from 'styled-components';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/Elements/Form';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { H2, H3 } from '@/components/Elements/Text';

const SubmitButton = styled.button`
  display: block;
  margin-top: 28px;
  padding: 6px;
  width: 150px;
  border-radius: 4px;
  background-color: #33a83a;
  color: #fff;
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
  profile_picture?: string;
  display_name?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: number | null;
}

export const SettingsPage = () => {
  const [validCodeText, setValidCodeText] = useState('');
  const [validNameText, setValidNameText] = useState('');

  const initialValues = {
    project_code: '',
    project_name: '',
    profile_picture: '',
    display_name: '',
    username: '',
    first_name: '',
    last_name: '',
    phone_number: '' as any,
  };

  const validationSchema = Yup.object({});

  const submitCode = async (codeValue: any) => {
    try {
      const response = await axiosInstance.patch(`/user/attributes?project_codes=${codeValue}`);
      setValidCodeText(`Successfully joined project '${response.data.name}'.`);
      return;
    } catch (error: any) {
      axiosErrorHandler(error);
    }
    return 'Invalid code';
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
        <H3>Delete a project</H3>
        <Input
          stacked={false}
          type="text"
          id="project_name"
          name="project_name"
          placeholder="Enter project name.."
          successText={validNameText}
        />
        <H2>Personalization</H2>
        <H3>Change profile picture</H3>
        <input
          type="file"
          id="profile_picture"
          name="profile_picture"
          accept="image/png, image/jpeg"
        />
        <H3>Change display name</H3>
        <div>
          <input type="radio" id="email" name="display_name" value="email" />
          <label htmlFor="email">Email</label>
          <input type="radio" id="username" name="display_name" value="username" />
          <label htmlFor="username">Username</label>
          <input type="radio" id="name" name="display_name" value="name" />
          <label htmlFor="name">Name</label>
        </div>
        <H2>Add additional info</H2>
        <H3>Username</H3>
        <Input stacked={false} type="text" id="username" name="username" placeholder="Username" />
        <H3>First and last name</H3>
        <Input
          stacked={false}
          type="text"
          id="first_name"
          name="first_name"
          placeholder="First name"
        />
        <Input
          stacked={false}
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Last name"
        />
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
