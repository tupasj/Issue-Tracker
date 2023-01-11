import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { Input, ErrorMessageText } from '@/components/Elements/Form';

const FormWrapper = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 4px;
  text-align: center;
`;

const SignupButton = styled.button`
  padding: 6px;
  width: 150px;
  border-radius: 4px;
  background-color: #5464e3;
  color: #fff;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: transform 200ms;
  &:hover {
    background-color: #3f4eca;
  }
`;

interface FormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
}

type Props = {
  isLoading?: boolean;
  signedUp: boolean;
  setIsloading?: React.Dispatch<React.SetStateAction<boolean>>;
  setSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
  setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
};

export const SignupForm = ({ signedUp, setSignedUp, setUserEmail }: Props) => {
  const [signupError, setSignUpError] = useState(false);

  const initialValues = {
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const validationSchema = Yup.object({
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
    try {
      const userCredentials = {
        email: values.email,
        password: values.password,
      };
      setUserEmail(userCredentials.email);
      const response = await axiosInstance.post('/user/register', userCredentials);
      console.log('/user/register response ', response);
      setSignedUp(true);
    } catch (error: any) {
      axiosErrorHandler(error);
      setSignedUp(false);
      setSignUpError(true);
    }
  };

  let validationActive = false;
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={validationActive}
        validateOnChange={validationActive}
        onSubmit={(values) => {
          onSubmit(values);
          setSignedUp(true);
        }}
      >
        <Form>
          <FormWrapper>
            {signupError && <ErrorMessageText>This account already exists.</ErrorMessageText>}
            <Input stacked={true} type="email" id="email" name="email" placeholder="Email" />
            <Input
              stacked={true}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <Input
              stacked={true}
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="Confirm password"
            />
            <SignupButton type="submit" onClick={() => (validationActive = true)}>
              Sign Up
            </SignupButton>
          </FormWrapper>
        </Form>
      </Formik>
    </>
  );
};
