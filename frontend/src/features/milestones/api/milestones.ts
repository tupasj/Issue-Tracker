import { axiosInstance, axiosErrorHandler } from '@/lib/axios';

const createMilestone = async (currentProject: any, payload: any) => {
  try {
    const newMilestone = await axiosInstance.post(
      `/projects/code=${currentProject.code}/milestones`,
      payload
    );
    return newMilestone.data;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

const getMilestones = async (currentProject: any) => {
  try {
    const milestones = await axiosInstance.get(`/projects/code=${currentProject.code}/milestones`);
    return milestones.data;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

export { createMilestone, getMilestones };
