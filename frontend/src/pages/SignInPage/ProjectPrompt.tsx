import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
  userEmail: string | null;
  setCurrentProject: React.Dispatch<React.SetStateAction<any | null>>;
};

export const ProjectPrompt = ({ userEmail, setCurrentProject }: Props) => {
  const [projectName, setProjectName] = useState('');
  const [projectCode, setProjectCode] = useState('');
  const [notificationText, setNotificationText] = useState('');
  const navigate = useNavigate();

  const addProject = async () => {
    try {
      const projectInfo = { projectName: projectName, email: userEmail };
      const projectInfoResponse = await axiosInstance.post('/projects', projectInfo);
      setCurrentProject(projectInfoResponse.data);
      navigate('/app/dashboard');
    } catch (error: any) {
      axiosErrorHandler(error);
    }
  };

  const joinProject = async () => {
    try {
      const getProjectResponse = await axiosInstance.get(`/projects/${projectCode}`);
      setCurrentProject(getProjectResponse.data);
      console.log('#1: setCurrentProject to Project object', getProjectResponse.data);
      navigate('/app/dashboard');
    } catch (error: any) {
      axiosErrorHandler(error);
      setNotificationText('Invalid code');
    }
  };

  return (
    <FormContainer>
      <ProjectPromptContainer>
        <MainText>Signup successful!</MainText>
        <NotificationBox>{notificationText}</NotificationBox>
        <Text>Start by creating a new project.</Text>
        <InputGroup>
          <Input
            type="text"
            placeholder="Enter a project name"
            onChange={(e) => setProjectName(e.target.value)}
          />
          <StyledFontAwesomeIcon icon={faArrowRight} onClick={addProject} />
        </InputGroup>
        <Bold>or</Bold>
        <Text>Join an ongoing project</Text>
        <InputGroup>
          <Input
            type="text"
            placeholder="Enter project code"
            onChange={(e) => setProjectCode(e.target.value)}
          />
          <StyledFontAwesomeIcon icon={faArrowRight} onClick={joinProject} />
        </InputGroup>
      </ProjectPromptContainer>
    </FormContainer>
  );
};
