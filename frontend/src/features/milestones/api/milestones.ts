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

const getMilestone = async (currentProject: any, issueNumber: number) => {
  try {
    const issueMilestone = await axiosInstance.get(
      `/issues/issueNumber=${issueNumber}/projectCode=${currentProject.code}/milestone`
    );
    return issueMilestone.data;
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

const getMilestoneIssues = async (currentProject: any, milestoneId: number) => {
  try {
    const milestoneIssues = await axiosInstance.get(
      `/projects/code=${currentProject.code}/milestone/id=${milestoneId}`
    );
    return milestoneIssues.data;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

const updateMilestone = async (currentProject: any, milestoneId: number, payload: any) => {
  try {
    const updatedMilestone = await axiosInstance.patch(
      `/projects/code=${currentProject.code}/milestone/id=${milestoneId}`,
      payload
    );
    return updatedMilestone.data;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

const deleteMilestone = async (currentProject: any, milestoneId: number) => {
  try {
    const response = await axiosInstance.delete(
      `/projects/code=${currentProject.code}/milestone/id=${milestoneId}`
    );
    return response;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

export {
  createMilestone,
  getMilestone,
  getMilestones,
  getMilestoneIssues,
  updateMilestone,
  deleteMilestone,
};
