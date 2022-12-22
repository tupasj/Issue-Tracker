import styled from 'styled-components';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ErrorMessageText } from '@/components/Elements/Form';

const FormWrapper = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  text-align: center;
`;

const FormControl = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: start;
`;

const StyledField = styled(Field)`
  height: 32px;
  padding-left: 6px;
  padding-right: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SignupButton = styled.button`
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

const ErrorWrapper = styled.div`
  height: 15px;
`;

const NotificationTextContainer = styled.div``;

interface FormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const SignupForm = () => {
  const [signedUp, setSignedUp] = useState(false);
  const [notificationText, setNotificationText] = useState('');

  const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('This field is required.')
      .min(2, 'Name should be a minimum of 2 characters.')
      .max(50, 'Please enter a name of 50 characters or less'),
    email: Yup.string().email('Invalid email format.').required('This field is required.'),
    password: Yup.string()
      .required('This field is required.')
      .min(8, 'Passwords should be a minimum of 8 characters.')
      .max(100, 'Please enter a password of 100 characters or less.'),
    passwordConfirmation: Yup.string()
      .required('This field is required.')
      .oneOf([Yup.ref('password')], 'Passwords must match.'),
  });

  const onSubmit = async (values: FormValues) => {
    console.log('values: ', values);
  };

  let validationActive = false;
  return (
    <>
      {!signedUp && (
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
              <FormControl>
                <StyledField type="text" id="name" name="name" placeholder="Name" />
              </FormControl>
              <ErrorWrapper>
                <ErrorMessage name="email" component={ErrorMessageText as any} />
              </ErrorWrapper>
              <FormControl>
                <StyledField type="email" id="email" name="email" placeholder="Email" />
              </FormControl>
              <ErrorWrapper>
                <ErrorMessage name="email" component={ErrorMessageText as any} />
              </ErrorWrapper>
              <FormControl>
                <StyledField type="password" id="password" name="password" placeholder="Password" />
              </FormControl>
              <ErrorWrapper>
                <ErrorMessage name="email" component={ErrorMessageText as any} />
              </ErrorWrapper>
              <FormControl>
                <StyledField
                  type="password"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  placeholder="Confirm password"
                />
              </FormControl>
              <ErrorWrapper>
                <ErrorMessage name="email" component={ErrorMessageText as any} />
              </ErrorWrapper>
              <SignupButton type="submit" onClick={() => (validationActive = true)}>
                Sign Up
              </SignupButton>
            </FormWrapper>
          </Form>
        </Formik>
      )}
    </>
  );
};
