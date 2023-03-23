import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { v4 } from 'uuid';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { firebaseStorage } from '@/lib/firebase';
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
  const [imageSelections, setImageSelections] = useState<any | null>([]);
  const initialValues = {};
  const validationSchema = Yup.object({});
  const { email, setProfileImage } = userContext();
  const firebaseStorageImages = ref(firebaseStorage, 'images/');

  const handleSubmit = async (e: any) => {
    console.log('prevent default');
    e.preventDefault();

    const imageRef = ref(firebaseStorage, `images/${imageSelection.name + v4()}`);
    uploadBytes(imageRef, imageSelection).then(() => alert('Image Uploaded'));
  };

  useEffect(() => {
    const fetchFirebaseStorageImages = () => {
      listAll(firebaseStorageImages).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageSelections((prev: any) => [...prev, url]);
          });
        });
      });
    };

    fetchFirebaseStorageImages();
  }, []);

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
        <img src={imageSelections[0]}></img>
      </StyledForm>
    </Formik>
  );
};
