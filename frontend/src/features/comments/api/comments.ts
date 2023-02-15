import { axiosInstance, axiosErrorHandler } from '@/lib/axios';

const createComment = async (currentIssue: any, userEmail: string, payload: any) => {
  const issueNumber = currentIssue.issue_number ? currentIssue.issue_number : currentIssue;
  try {
    const newComment = await axiosInstance.post(
      `/issues/issueNumber=${issueNumber}/user/email=${userEmail}/comment`,
      payload
    );
    return newComment.data;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

const getComments = async (currentIssueNumber: number, currentProjectCode: string) => {
  try {
    const commentsResponse: any = await axiosInstance.get(
      `/issues/issueNumber=${currentIssueNumber}/projectCode=${currentProjectCode}/comments`
    );
    return commentsResponse.data;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

export { createComment, getComments };
