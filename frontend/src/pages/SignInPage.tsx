import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LoginForm, SignupForm } from '@/components/Elements/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #b677ea;
  background-image: linear-gradient(57deg, #b677ea 0%, #58a7f7 100%);
`;

const Title = styled.div`
  margin-bottom: 18px;
  font-size: 1.25rem;
  font-weight: bold;
`;

const SignInMessage = styled.div`
  opacity: 0.5;
  margin-bottom: 10px;
`;

const SwitchFormMessage = styled.div`
  margin-top: 30px;
  font-size: 0.75rem;
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

const SignupMessage = styled.div`
  font-weight: bold;
`;

const ProjectPromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 22px;
`;

const CreateProjectButton = styled.div`
  color: white;
  background-color: #30b930;
  border-radius: 4px;
  padding: 8px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #2da82d;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 1.25rem;
  font-weight: 600;
`;

const Bold = styled.div`
  font-weight: 600;
`;

const Input = styled.input`
  height: 32px;
  padding-left: 6px;
  padding-right: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const LoginFormContainer = () => {
  const navigate = useNavigate();

  return (
    <FormContainer>
      <Title>Welcome to Issue Tracker</Title>
      <SignInMessage>Sign in to your account</SignInMessage>
      <LoginForm />
      <SwitchFormMessage>
        Don't have an account?{' '}
        <SwitchFormLink onClick={() => navigate(`/register`)}>Register now</SwitchFormLink>
      </SwitchFormMessage>
    </FormContainer>
  );
};

const SignupFormContainer = () => {
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

const ProjectPrompt = () => {
  return (
    <FormContainer>
      <ProjectPromptContainer>
        <div>It looks like you're not part of any projects right now.</div>
        <CreateProjectButton>
          Create a new project <StyledFontAwesomeIcon icon={faPlus} />
        </CreateProjectButton>
        <Bold>or</Bold>
        <div>Join an ongoing project</div>
        <Input type="text" placeholder="Enter project code..." />
      </ProjectPromptContainer>
    </FormContainer>
  );
};

type Props = {
  form: string;
};

export const SignInPage = ({ form }: Props): any => {
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
