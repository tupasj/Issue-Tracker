import { axiosInstance, axiosErrorHandler } from '@/lib/axios';

const getUserInfo = async (email: string) => {
  try {
    const response = await axiosInstance.get(`/user/email=${email}`);
    return response.data;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

const getUsers = async (currentProject: any) => {
  try {
    const projectUsers = await axiosInstance.get(`/projects/code=${currentProject.code}/users`);
    return projectUsers.data;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

export { getUserInfo, getUsers };
