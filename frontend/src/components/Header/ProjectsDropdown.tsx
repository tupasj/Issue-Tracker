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
    console.log('userCtx: ', userCtx);
    console.log('projects: ', projects);
    console.log('currentProject: ', currentProject);
  };

  // const getProjects = async () => {
  //   console.log('getProjects() ');
  //   try {
  //     // Get user projects
  //     console.log('..get user projects');
  //     const userInfoReponse = await axiosInstance.get(`/user/email=${userCtx?.email}`);
  //     console.log('userInfoResponse: ', userInfoReponse);
  //     const userInfo = userInfoReponse.data;
  //     const projectCodes = userInfo.project_codes;

  //     // Display projects
  //     console.log('..display projects.');
  //     let newProjects = [];
  //     for (let i = 0; i < projectCodes.length; i++) {
  //       const response = await axiosInstance.get(`/projects/${projectCodes[i]}`);
  //       console.log('projectObj response', response);
  //       const project = response.data;
  //       newProjects.push(project);
  //     }
  //     initialProjects.current = newProjects;
  //     setProjects(newProjects);
  //   } catch (error: any) {
  //     axiosErrorHandler(error);
  //   }
  // };

  // useEffect(() => {
  //   console.log('INITIAL LOAD');
  //   getProjects();
  // }, []);

  // useEffect(() => {
  //   console.log('PROJECTS CHANGE');
  //   const setCurrentProjectValue = async () => {
  //     console.log('setCurrentProjectValue() ');
  //     const userInfoReponse = await axiosInstance.get(`/user/email=${userCtx?.email}`);
  //     console.log('');
  //     const userInfo = userInfoReponse.data;
  //     try {
  //       if (!userInfo.current_project) {
  //         console.log('current project:  false');
  //         const res = await axiosInstance.patch(
  //           `/user/email=${userCtx?.email}/attributes?current_project=${projects[0].code}`
  //         );
  //         console.log('patch user res: ', res);
  //         // @ts-ignore
  //         setCurrentProject(projects[0]);
  //       } else if (userInfo.current_project) {
  //         console.log('current project: true');
  //         const projectsResponse = await axiosInstance.get(`/projects/${currentProject.code}`);
  //         const projectObj = projectsResponse.data;
  //         console.log('projectObj: ', projectObj);
  //         // @ts-ignore
  //         setCurrentProject(projectObj);
  //       }
  //     } catch (error: any) {
  //       axiosErrorHandler(error);
  //     }
  //   };

  //   if (!currentProject) {
  //     console.log('projects: ', projects);
  //     setCurrentProjectValue();
  //   }
  // }, [projects]);

  // useEffect(() => {
  //   console.log('CURRENT PROJECTS CHANGE');
  //   const filteredProjects = initialProjects.current.filter(
  //     (project: any) => project.code !== currentProject.code
  //   );
  //   setProjects(filteredProjects);
  // }, [currentProject]);

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
            {/* {projects[0] &&
              projects.map((project: any) => {
                return (
                  <Project
                    name={project.name}
                    code={project.code}
                    setCurrentProject={setCurrentProject}
                  />
                );
              })} */}
            <div>Foobar</div>
            <AddNewProject />
          </>
        </DropdownContainer>
      )}
    </Container>
  );
};
