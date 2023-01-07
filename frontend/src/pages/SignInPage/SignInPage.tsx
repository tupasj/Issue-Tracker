import styled from 'styled-components';
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
  userEmail: string | null;
  setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentProject: React.Dispatch<React.SetStateAction<any | null>>;
};

export const SignInPage = ({ form, userEmail, setUserEmail, setCurrentProject }: Props): any => {
  if (form === 'login') {
    return (
      <Container>
        <LoginFormContainer setUserEmail={setUserEmail} />
      </Container>
    );
  } else if (form === 'signup') {
    return (
      <Container>
        <SignupFormContainer
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          setCurrentProject={setCurrentProject}
        />
      </Container>
    );
  }
};
