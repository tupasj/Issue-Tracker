import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupForm, ProjectPrompt } from '@/pages/SignInPage';

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

type Props = {
  userEmail: string | null;
  setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentProject: React.Dispatch<React.SetStateAction<any | null>>;
};

export const SignupFormContainer = ({ userEmail, setUserEmail, setCurrentProject }: Props) => {
  const [signedUp, setSignedUp] = useState(false);
  const navigate = useNavigate();

  return (
    <FormContainer>
      {signedUp ? (
        <>
          <ProjectPrompt userEmail={userEmail} setCurrentProject={setCurrentProject} />
        </>
      ) : (
        <>
          <SignupMessage>Create a new account</SignupMessage>
          <SignupForm signedUp={signedUp} setSignedUp={setSignedUp} setUserEmail={setUserEmail} />
          <SwitchFormMessage>
            Already have an account?{' '}
            <SwitchFormLink onClick={() => navigate(`/sign-in`)}>Sign in</SwitchFormLink>
          </SwitchFormMessage>
        </>
      )}
    </FormContainer>
  );
};
