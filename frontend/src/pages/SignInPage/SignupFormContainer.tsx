import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SignupForm } from '@/components/Elements/Form';

const SwitchFormLink = styled.span`
  color: #59b1e6;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SignupMessage = styled.div`
  font-weight: bold;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 550px;
  height: 500px;
  border-radius: 12px;
  background-color: white;
`;

const SwitchFormMessage = styled.div`
  margin-top: 30px;
  font-size: 0.75rem;
`;

export const SignupFormContainer = () => {
  const navigate = useNavigate();

  return (
    <FormContainer>
      <SignupMessage>Create a new account</SignupMessage>
      <SignupForm />
      <SwitchFormMessage>
        Already have an account?{' '}
        <SwitchFormLink onClick={() => navigate(`/sign-in`)}>Sign in</SwitchFormLink>
      </SwitchFormMessage>
    </FormContainer>
  );
};
