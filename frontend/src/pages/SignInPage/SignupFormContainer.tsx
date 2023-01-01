import styled from 'styled-components';
import { useState } from 'react';
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

const ProceedButton = styled.button`
  margin-top: 22px;
  padding: 12px;
  width: auto;
  border-radius: 4px;
  background-color: #5464e3;
  color: #fff;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: transform 200ms;
  &:hover {
    background-color: #3f4eca;
  }
`;

type Props = {
  setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
};

export const SignupFormContainer = ({ setUserEmail }: Props) => {
  const [signedUp, setSignedUp] = useState(false);
  const navigate = useNavigate();

  return (
    <FormContainer>
      {signedUp ? (
        <>
          <SignupMessage>Successfully signed up!</SignupMessage>
          <ProceedButton onClick={() => navigate('/app')}>Proceed to dashboard</ProceedButton>
        </>
      ) : (
        <>
          <SignupMessage>Create a new account</SignupMessage>
          <SignupForm setSignedUp={setSignedUp} setUserEmail={setUserEmail} />
          <SwitchFormMessage>
            Already have an account?{' '}
            <SwitchFormLink onClick={() => navigate(`/sign-in`)}>Sign in</SwitchFormLink>
          </SwitchFormMessage>
        </>
      )}
    </FormContainer>
  );
};
