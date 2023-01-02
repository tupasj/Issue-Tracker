import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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

const ProjectPromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CreateProjectButton = styled.div`
  margin-top: 8px;
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
  padding-top: 20px;
  padding-bottom: 20px;
  font-weight: 600;
`;

const Input = styled.input`
  height: 32px;
  padding-left: 6px;
  padding-right: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 8px;
`;

const Text = styled.div`
  padding-bottom: 8px;
`;

export const ProjectPrompt = () => {
  return (
    <FormContainer>
      <ProjectPromptContainer>
        <Text>Signup successful!</Text>
        <Text>Start by creating a new project or joining an existing one.</Text>
        <CreateProjectButton>
          Create a new project <StyledFontAwesomeIcon icon={faPlus} />
        </CreateProjectButton>
        <Bold>or</Bold>
        <Text>Join an ongoing project</Text>
        <Input type="text" placeholder="Enter project code..." />
      </ProjectPromptContainer>
    </FormContainer>
  );
};
