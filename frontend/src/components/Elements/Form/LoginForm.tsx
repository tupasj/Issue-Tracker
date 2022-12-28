import styled from 'styled-components';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/Elements/Form';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  text-align: center;
`;

const LoginButton = styled.button`
  padding: 6px;
  width: 150px;
  border-radius: 4px;
  background-color: #5464e3;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: transform 200ms;
  &:hover {
    background-color: #3f4eca;
  }
`;

const NotificationTextContainer = styled.div``;

interface FormValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [notificationText, setNotificationText] = useState('');

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format.').required('This field is required.'),
    password: Yup.string()
      .required('This field is required.')
      .min(8, 'Passwords should be a minimum of 8 characters.')
      .max(100, 'Please enter a password of 100 characters or less.'),
  });

  const onSubmit = async (values: FormValues) => {
    console.log('values: ', values);
  };

  let validationActive = false;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={validationActive}
      validateOnChange={validationActive}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      <Form>
        <FormWrapper>
          <NotificationTextContainer>{notificationText}</NotificationTextContainer>
          <Input type="email" id="email" name="email" placeholder="Email" />
          <Input type="password" id="password" name="password" placeholder="Password" />
          <LoginButton type="submit" onClick={() => (validationActive = true)}>
            Log In
          </LoginButton>
        </FormWrapper>
      </Form>
    </Formik>
  );
};
