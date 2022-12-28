import styled from 'styled-components';
import { useState } from 'react';
import { LoginFormContainer, SignupFormContainer } from '@/pages/SignInPage';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #b677ea;
  background-image: linear-gradient(57deg, #b677ea 0%, #58a7f7 100%);
`;

type Props = {
  form: string;
};

export const SignInPage = ({ form }: Props): any => {
  const [isLoading, setIsLoading] = useState(false);

  if (form === 'login') {
    return (
      <Container>
        <LoginFormContainer />
      </Container>
    );
  } else if (form === 'signup') {
    return (
      <Container>
        <SignupFormContainer />
      </Container>
    );
  }
};
