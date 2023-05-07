import { Project } from '../../models/Project';

const DBGetProject = async (code: string) => {
  const project: any = await Project.findOne({ where: { code } });
  return project;
};

export { DBGetProject };
