import styled from 'styled-components';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { v4 } from 'uuid';
import { ref, uploadBytes } from 'firebase/storage';
import { firebaseStorage } from '@/lib/firebase';
import { userContext } from '@/context';
import { useUserInfo } from '@/hooks';
import {
  updateUserProfileImage,
  getUserDisplayName,
  updateUserDisplayName,
} from '@/features/users';
import { SubformSubmitButton } from '@/components/Form';

const Container = styled.div``;

const H2 = styled.h2`
  padding-top: 22px;
  font-weight: 600;
`;

const H3 = styled.h3`
  padding-top: 14px;
  padding-bottom: 8px;
  font-style: italic;
`;

type Props = {
  submitButtonRef: any;
  setChangesApplied: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SettingsPersonalization = ({ submitButtonRef, setChangesApplied }: Props) => {
  const [imageSelection, setImageSelection] = useState<any | null>(null);
  const { email, setProfileImage, setDisplayName } = userContext();
  const initialValues = {
    displayNameSelection: '',
  };

  const changeProfileImage = async () => {
    try {
      if (imageSelection) {
        const imageRef: any = ref(firebaseStorage, `images/${imageSelection.name + v4()}`);
        const imageName = imageRef._location.path_.slice(7);
        const imageBaseURL =
          'https://firebasestorage.googleapis.com/v0/b/issue-tracker-ec9be.appspot.com/o/images%2F';
        const imageFullPath = imageBaseURL + imageName + '?alt=media';

        await updateUserProfileImage(email, imageFullPath);
        await uploadBytes(imageRef, imageSelection);
        setProfileImage(imageFullPath);
        setChangesApplied(true);
      }
    } catch (error: any) {
      console.log('uploadBytes error: ', error);
    }
  };

  const changeUserDisplayName = async (values: any) => {
    try {
      if (values.displayNameSelection) {
        await updateUserDisplayName(email, values);
        setChangesApplied(true);
        const displayName = await getUserDisplayName(email);
        setDisplayName(displayName);
      }
    } catch (error: any) {
      console.log('changeUserDisplayName error: ', error);
    }
  };

  const handleSubmit = async (values: any) => {
    if (imageSelection || values.displayNameSelection) {
      console.log('SettingsPersonalization submit');
      console.log('values: ', values);
      await changeProfileImage();
      await changeUserDisplayName(values);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => handleSubmit(values)}>
      <Form>
        <Container>
          <H2>Personalization</H2>
          <H3>Change profile picture</H3>
          <input
            type="file"
            name="profile_image"
            onChange={(e: any) => setImageSelection(e.target.files[0])}
          />
          <H3>Change display name</H3>
          <div>
            <Field type="radio" id="username" name="displayNameSelection" value="username" />
            <label htmlFor="username">Username</label>
            <Field type="radio" id="name" name="displayNameSelection" value="name" />
            <label htmlFor="name">Name</label>
          </div>
        </Container>
        <SubformSubmitButton ref={submitButtonRef} />
      </Form>
    </Formik>
  );
};
