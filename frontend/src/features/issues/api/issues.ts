import { axiosInstance, axiosErrorHandler } from '@/lib/axios';

const getIssues = async (currentProject: any) => {
  try {
    const issuesResponse = await axiosInstance.get(`/projects/code=${currentProject.code}/issues`);
    return issuesResponse.data;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

export { getIssues };
