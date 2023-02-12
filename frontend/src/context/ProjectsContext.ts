import { createContext, useContext } from 'react';

interface ProjectsContextInterface {
  currentProject: any | null;
  setCurrentProject: React.Dispatch<React.SetStateAction<any>>;
  projects: any | null;
  setProjects: React.Dispatch<React.SetStateAction<any>>;
}

export const ProjectsContext = createContext<ProjectsContextInterface | null>(null);

export const projectsContext = () => {
  const projectsCtx = useContext(ProjectsContext);

  if (!projectsCtx) {
    throw new Error('projectsContext has to be used within <ProjectsContext.Provider>');
  }

  return projectsCtx;
};
