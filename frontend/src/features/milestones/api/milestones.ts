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

const getMilestones = async (currentProject: any, openStatus?: string) => {
  try {
    let milestonesResponse: any;
    if (openStatus) {
      const isOpenBool = openStatus === 'open' ? 'true' : 'false';
      milestonesResponse = await axiosInstance.get(
        `/projects/code=${currentProject.code}/milestones/:openStatus?isOpen=${isOpenBool}`
      );
    } else {
      milestonesResponse = await axiosInstance.get(
        `/projects/code=${currentProject.code}/milestones`
      );
    }
    return milestonesResponse.data;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

export { createMilestone, getMilestones };
