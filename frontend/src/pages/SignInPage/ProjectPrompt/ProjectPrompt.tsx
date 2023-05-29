import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { createProject, joinProject } from '@/features/projects';

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

const ProjectPromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  height: 22px;
  cursor: pointer;
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
`;

const MainText = styled.div`
  padding-bottom: 28px;
  font-weight: 600;
`;

const Text = styled.div`
  padding-bottom: 10px;
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
`;

const NotificationBox = styled.div`
  padding-bottom: 8px;
  color: #f70000;
`;

type Props = {
  userEmail: any;
  setCurrentProject: React.Dispatch<React.SetStateAction<any | null>>;
};

export const ProjectPrompt = ({ userEmail, setCurrentProject }: Props) => {
  const [projectName, setProjectName] = useState('');
  const [projectCode, setProjectCode] = useState('');
  const [notificationText, setNotificationText] = useState('');
  const navigate = useNavigate();

  const handleAddProject = async () => {
    const updatedProjects = await createProject(projectName, userEmail);

    if (updatedProjects) {
      setCurrentProject(updatedProjects[0]);
      navigate('/app/dashboard');
    } else if (!updatedProjects) {
      setNotificationText('Could not create project');
    }
  };

  const handleJoinProject = async () => {
    const joinedProject = await joinProject(projectCode, userEmail);

    if (joinedProject) {
      setCurrentProject(joinedProject[0]);
      navigate('/app/dashboard');
    } else if (!joinedProject) {
      setNotificationText('Invalid code');
    }
  };

  return (
    <FormContainer>
      <ProjectPromptContainer>
        <MainText>You currently have no projects.</MainText>
        <NotificationBox>{notificationText}</NotificationBox>
        <Text>Start by creating a new project.</Text>
        <InputGroup>
          <Input
            type="text"
            placeholder="Enter a project name"
            onChange={(e) => setProjectName(e.target.value)}
          />
          <StyledFontAwesomeIcon icon={faArrowRight} onClick={handleAddProject} />
        </InputGroup>
        <Bold>or</Bold>
        <Text>Join an ongoing project</Text>
        <InputGroup>
          <Input
            type="text"
            placeholder="Enter project code"
            onChange={(e) => setProjectCode(e.target.value)}
          />
          <StyledFontAwesomeIcon icon={faArrowRight} onClick={handleJoinProject} />
        </InputGroup>
      </ProjectPromptContainer>
    </FormContainer>
  );
};
