import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/components/Elements/Form';

const Title = styled.div`
  margin-bottom: 18px;
  font-size: 1.25rem;
  font-weight: bold;
`;

const SignInMessage = styled.div`
  opacity: 0.5;
  margin-bottom: 10px;
`;

const SwitchFormLink = styled.span`
  color: #59b1e6;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
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

type Props = {
  setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
};

export const LoginFormContainer = ({ setUserEmail }: Props) => {
  const navigate = useNavigate();

  return (
    <FormContainer>
      <Title>Welcome to Issue Tracker</Title>
      <SignInMessage>Sign in to your account</SignInMessage>
      <LoginForm setUserEmail={setUserEmail} />
      <SwitchFormMessage>
        Don't have an account?{' '}
        <SwitchFormLink onClick={() => navigate(`/register`)}>Register now</SwitchFormLink>
      </SwitchFormMessage>
    </FormContainer>
  );
};
