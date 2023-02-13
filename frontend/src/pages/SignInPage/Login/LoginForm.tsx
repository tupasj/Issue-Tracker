import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { login } from '@/features/auth';
import { Input } from '@/elements/Form';

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
  font-weight: 600;
  cursor: pointer;
  transition: transform 200ms;
  &:hover {
    background-color: #3f4eca;
  }
`;

const NotificationTextContainer = styled.div`
  color: #f40000;
`;

interface FormValues {
  email: string;
  password: string;
}

type Props = {
  setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
};

export const LoginForm = ({ setUserEmail }: Props) => {
  const [notificationText, setNotificationText] = useState('');
  const navigate = useNavigate();

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
    const userCredentials = {
      email: values.email,
      password: values.password,
    };
    const loginResponse = await login(userCredentials);

    if (loginResponse.tokens) {
      setUserEmail(userCredentials.email);
      navigate('/app/dashboard');
    } else {
      setNotificationText(loginResponse.response.data.message);
    }
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
          <Input stacked={true} type="email" id="email" name="email" placeholder="Email" />
          <Input
            stacked={true}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
          <LoginButton type="submit" onClick={() => (validationActive = true)}>
            Log In
          </LoginButton>
        </FormWrapper>
      </Form>
    </Formik>
  );
};
