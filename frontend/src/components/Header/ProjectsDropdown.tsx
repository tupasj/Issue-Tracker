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

  const getUserProjects = async () => {
    try {
      const userProjects = await axiosInstance.get(`/projects/user/email=${userCtx?.email}`);
      setProjects(userProjects.data);
      setCurrentProject(userProjects.data[0]);
    } catch (error: any) {
      axiosErrorHandler(error);
    }
  };

  useEffect(() => {
    getUserProjects();
  }, []);

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
            {projects &&
              projects.map((project: any) => {
                return <Project project={project} setCurrentProject={setCurrentProject} />;
              })}
            <AddNewProject />
          </>
        </DropdownContainer>
      )}
    </Container>
  );
};
