import { axiosInstance, axiosErrorHandler } from '@/lib/axios';

const createIssue = async (payload: any) => {
  try {
    const newIssue = await axiosInstance.post('/projects/issues', payload);
    return newIssue.data;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

const getIssues = async (currentProject: any, openStatus?: string) => {
  try {
    let issuesResponse;
    if (openStatus) {
      const isOpenBool = openStatus === 'open' ? 'true' : 'false';
      issuesResponse = await axiosInstance.get(
        `/projects/code=${currentProject.code}/issues/:openStatus?isOpen=${isOpenBool}`
      );
    } else {
      issuesResponse = await axiosInstance.get(`/projects/code=${currentProject.code}/issues`);
    }
    return issuesResponse.data;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

const updateIssueLabels = async (
  issueNumber: number,
  currentProject: any,
  labelNames: string[],
  email: string
) => {
  try {
    const updatedIssue = await axiosInstance.patch(
      `/issues/issueNumber=${issueNumber}/projectCode=${currentProject.code}/labels`,
      { labelNames, email }
    );
    return updatedIssue.data;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

const updateIssueOpenStatus = async (currentIssue: any, newStatus: any) => {
  try {
    const updatedIssue: any = await axiosInstance.patch(
      `/projects/code=${currentIssue.projectCode}/issue/issueNumber=${currentIssue.issue_number}`,
      { is_open: newStatus }
    );
    return updatedIssue.data;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

const updateIssuePriority = async (issueNumber: number, currentProject: any, priority: string) => {
  try {
    const updatedIssue = await axiosInstance.patch(
      `/issues/issueNumber=${issueNumber}/projectCode=${currentProject.code}/priority`,
      { priority }
    );
    return updatedIssue.data;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

const deleteIssue = async (issueNumber: number, currentProject: any) => {
  try {
    const deleteResponse = await axiosInstance.delete(
      `/issues/issueNumber=${issueNumber}/projectCode=${currentProject.code}`
    );
    return deleteResponse;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

export {
  createIssue,
  getIssues,
  updateIssueLabels,
  updateIssueOpenStatus,
  updateIssuePriority,
  deleteIssue,
};
