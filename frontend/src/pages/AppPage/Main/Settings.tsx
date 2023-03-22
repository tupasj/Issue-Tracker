import styled from 'styled-components';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { userContext } from '@/context';
import { getUserProfileImage, updateUserProfileImage } from '@/features/users';
import { SettingsAdditional } from './SettingsAdditional';
import { SettingsPersonalization } from './SettingsPersonalization';
import { SettingsProjects } from './SettingsProjects';
import { firebaseStorage } from '@/lib/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

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

  const handleSubmit = async (e: any) => {
    console.log('prevent default');
    e.preventDefault();

    const imageRef = ref(firebaseStorage, `images/${imageSelection.name + v4()}`);
    uploadBytes(imageRef, imageSelection).then(() => alert('Image Uploaded'));
  };

  let validationActive = false;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={validationActive}
      validateOnChange={validationActive}
      onSubmit={() => {}}
    >
      <StyledForm onSubmit={(e: any) => handleSubmit(e)} encType="multipart/form-data">
        <SettingsProjects />
        <SettingsPersonalization setImageSelection={setImageSelection} />
        <SettingsAdditional />
        <SubmitButton type="submit">Save changes</SubmitButton>
      </StyledForm>
    </Formik>
  );
};
