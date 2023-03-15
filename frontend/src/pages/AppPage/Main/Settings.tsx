import styled from 'styled-components';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { userContext } from '@/context';
import { getUserProfileImage, updateUserProfileImage } from '@/features/users';
import { SettingsAdditional } from './SettingsAdditional';
import { SettingsPersonalization } from './SettingsPersonalization';
import { SettingsProjects } from './SettingsProjects';

const SubmitButton = styled.button`
  display: block;
  margin-top: 26px;
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

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: start;
`;

interface FormValues {}

export const Settings = () => {
  const [imageSelection, setImageSelection] = useState<any | null>(null);
  const initialValues = {};
  const validationSchema = Yup.object({});
  const { email, setProfileImage } = userContext();

  const handleSubmit = async () => {
    if (imageSelection) {
      await updateUserProfileImage(email, imageSelection.name);
      const userProfileImage = await getUserProfileImage(email);
      setProfileImage(userProfileImage);
    }
  };

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
        <SettingsProjects />
        <SettingsPersonalization setImageSelection={setImageSelection} />
        <SettingsAdditional />
        <SubmitButton type="submit" onClick={handleSubmit}>
          Save changes
        </SubmitButton>
      </StyledForm>
    </Formik>
  );
};
