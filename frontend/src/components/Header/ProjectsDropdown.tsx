import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { UserContext } from '@/context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { TooltipWrapper } from '@/components/Elements/Text';
import { Project, AddNewProject } from '@/components/Elements/Project';

const Container = styled.div`
  cursor: pointer;
  position: relative;
  z-index: 4;
  width: 262px;
`;

const CurrentProject = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 14px;
  padding-right: 14px;
  justify-content: center;
  background-color: #f7faf9;
  border-radius: 8px;
  border: 2px solid rgba(0, 0, 0, 0.25);
`;

const ProjectName = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 37px;
  width: 250px;
  padding: 4px;
  border-radius: 4px;
  border-width: 2px;
  border-color: rgba(0, 0, 0, 0.25);
  border-style: solid;
  background-color: #f7faf9;
  z-index: -1;
`;

interface Project {
  map(arg0: (project: any) => void): import('react').ReactNode;
  name: string;
  code: string;
}

export const ProjectsDropdown = () => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const userCtx = useContext(UserContext);

  const getProjects = async () => {
    try {
      const response = await axiosInstance.get(`/user/email=${userCtx?.email}`);
      console.log('response: ', response);
      const projectCodes = response.data.project_codes;
      console.log('projectCodes: ', projectCodes);
      for (let i = 0; i < projectCodes.length; i++) {
        const response = await axiosInstance.get(`projects/${projectCodes[i]}`);
        const projectCode = response.data.code;
        console.log('projectCode: ', projectCode);
        setProjects([...projects, projectCode]);
      }
    } catch (error: any) {
      axiosErrorHandler(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const toggleDropdown = () => {
    console.log('projects: ', projects);
    if (!dropdownActive) {
      setDropdownActive(true);
    } else if (dropdownActive) {
      setDropdownActive(false);
    }
  };

  return (
    <Container>
      <CurrentProject onClick={toggleDropdown}>
        <ProjectName>
          <TooltipWrapper text="Project name">{projects && <>{projects[0]}</>}</TooltipWrapper>
        </ProjectName>
        <FontAwesomeIcon icon={faAngleDown} />
      </CurrentProject>
      {dropdownActive && (
        // @ts-ignore
        <DropdownContainer>
          {projects &&
            projects.map((project) => {
              // @ts-ignore
              <Project>{project}</Project>;
            })}
          <AddNewProject />
        </DropdownContainer>
      )}
    </Container>
  );
};
