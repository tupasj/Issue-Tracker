import { createContext } from 'react';

export interface ProjectContextInterface {
  name: string;
  code: string | null;
}

export const ProjectContext = createContext<ProjectContextInterface | null>(null);
