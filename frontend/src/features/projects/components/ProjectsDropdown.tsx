import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { userContext, projectsContext } from '@/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { TooltipWrapper } from '@/elements';
import { getProjects, AddNewProject, Project } from '@/features/projects';

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
  const { email } = userContext();
  const { currentProject, setCurrentProject, projects, setProjects } = projectsContext();

  const toggleDropdown = () => {
    if (!dropdownActive) {
      setDropdownActive(true);
    } else if (dropdownActive) {
      setDropdownActive(false);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getProjects(email);
      setProjects(projects);
      setCurrentProject(projects[0]);
    };

    fetchProjects();
  }, []);

  useEffect(() => {}, [currentProject]);

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
                return (
                  <Project
                    key={project.code}
                    project={project}
                    setCurrentProject={setCurrentProject}
                  />
                );
              })}
            <AddNewProject />
          </>
        </DropdownContainer>
      )}
    </Container>
  );
};
