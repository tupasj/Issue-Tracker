import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/pages/SignInPage';

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
  background-color: var(--white);
`;

const SwitchFormMessage = styled.div`
  margin-top: 30px;
  font-size: 0.75rem;
`;

type Props = {
  userEmail: string | null;
  setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentProject: React.Dispatch<React.SetStateAction<any | null>>;
};

export const LoginFormContainer = ({ userEmail, setUserEmail, setCurrentProject }: Props) => {
  const [noUserProjects, setNoUserProjects] = useState(false);
  const navigate = useNavigate();

  return (
    <FormContainer>
      {!noUserProjects && (
        <>
          <Title>Welcome to Issue Tracker</Title>
          <SignInMessage>Sign in to your account</SignInMessage>
        </>
      )}
      <LoginForm
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        setCurrentProject={setCurrentProject}
        noUserProjects={noUserProjects}
        setNoUserProjects={setNoUserProjects}
      />
      {!noUserProjects && (
        <SwitchFormMessage>
          Don't have an account?{' '}
          <SwitchFormLink onClick={() => navigate(`/register`)}>Register now</SwitchFormLink>
        </SwitchFormMessage>
      )}
    </FormContainer>
  );
};
