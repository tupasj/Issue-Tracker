import styled from 'styled-components';
import { useState, useEffect, useContext, useRef } from 'react';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { UserContext, ProjectsContext } from '@/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Project } from '@/components/Header';
import { TooltipWrapper } from '@/components/Elements/Text';
import { AddNewProject } from '@/components/Elements/Project';

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
  const userCtx = useContext(UserContext);
  // @ts-ignore
  const { currentProject, setCurrentProject, projects, setProjects } = useContext(ProjectsContext);
  let initialProjects: any = useRef([]);

  const toggleDropdown = () => {
    if (!dropdownActive) {
      setDropdownActive(true);
    } else if (dropdownActive) {
      setDropdownActive(false);
    }
  };

  // Get user's projects
  // If current_project, set it on the model and render it. Else render current_project.
  // Use useRef to store the initially loaded projects to filter on every setCurrentProject update (part of the "switching"). Simply update the ref when adding or deleting a new project (the "switch" should still work)

  const getUserProjects = async () => {
    try {
      const userInfoReponse = await axiosInstance.get(`/user/email=${userCtx?.email}`);
      console.log('userInfoResponse: ', userInfoReponse);
    } catch (error: any) {
      axiosErrorHandler(error);
    }
  };

  return (
    <Container>
      <CurrentProject onClick={toggleDropdown}>
        <ProjectName>
          <TooltipWrapper text={currentProject && currentProject.name}>
            {currentProject && <>{currentProject.name}</>}
          </TooltipWrapper>
        </ProjectName>
        <FontAwesomeIcon icon={faAngleDown} />
      </CurrentProject>
      {dropdownActive && (
        <DropdownContainer>
          <>
            <div>Foobar</div>
            <AddNewProject />
          </>
        </DropdownContainer>
      )}
    </Container>
  );
};
