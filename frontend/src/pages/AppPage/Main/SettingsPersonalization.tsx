import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { v4 } from 'uuid';
import { ref, uploadBytes } from 'firebase/storage';
import { firebaseStorage } from '@/lib/firebase';
import { userContext } from '@/context';
import {
  getUserProfileImage,
  updateUserProfileImage,
  updateUserDisplayName,
} from '@/features/users';
import { Input } from '@/components/Form';
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

const StyledInput = styled(Input)`
  padding-left: 0px !important;
  padding-right: 0px !important;
`;

type Props = {
  submitButtonRef: any;
};

export const SettingsPersonalization = ({ submitButtonRef }: Props) => {
  const [imageSelection, setImageSelection] = useState<any | null>(null);
  const { email, setProfileImage } = userContext();
  const initialValues = {
    displayNameSelection: '',
  };

  const changeProfileImage = async () => {
    try {
      const imageRef: any = ref(firebaseStorage, `images/${imageSelection.name + v4()}`);
      const imageName = imageRef._location.path_.slice(7);
      const imageBaseURL =
        'https://firebasestorage.googleapis.com/v0/b/issue-tracker-ec9be.appspot.com/o/images%2F';
      const imageFullPath = imageBaseURL + imageName + '?alt=media';

      await updateUserProfileImage(email, imageFullPath);
      await uploadBytes(imageRef, imageSelection);
      setProfileImage(imageFullPath);
    } catch (error: any) {
      console.log('uploadBytes error: ', error);
    }
  };

  const handleSubmit = async (values: any) => {
    console.log('SettingsPersonalization submit');
    console.log('values: ', values);
    await changeProfileImage();
    await updateUserDisplayName(email, values);
  };

  useEffect(() => {
    const fetchUserProfileImage = async () => {
      try {
        const userProfileImage = await getUserProfileImage(email);
        setProfileImage(userProfileImage);
      } catch (error: any) {
        console.log('error: ', error);
      }
    };

    fetchUserProfileImage();
  }, []);

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
