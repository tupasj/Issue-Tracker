import { axiosInstance, axiosErrorHandler } from '@/lib/axios';

const createProject = async (projectName: string, email: string) => {
  try {
    const projectInfo = { projectName, email };
    const updatedProjects = await axiosInstance.post('/projects', projectInfo);
    return updatedProjects.data;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

const getProjects = async (email: string) => {
  try {
    const userProjects = await axiosInstance.get(`/projects/user/email=${email}`);
    return userProjects.data;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

const joinProject = async (projectCode: string, email: string) => {
  try {
    const projectJoined = await axiosInstance.put(`/projects/code=${projectCode}`, {
      email,
    });
    return projectJoined.data;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

export { createProject, getProjects, joinProject };
