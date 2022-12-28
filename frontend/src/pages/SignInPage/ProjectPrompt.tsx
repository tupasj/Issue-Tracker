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

export const ProjectPrompt = () => {
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
