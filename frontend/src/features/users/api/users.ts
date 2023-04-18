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

const updateUserProfileImage = async (email: string, imageURL: string) => {
  try {
    await axiosInstance.patch(`/user/email=${email}/profileImage`, { imageURL });
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

const getUserDisplayName = async (email: string) => {
  try {
    const userDisplayName = await axiosInstance.get(`/user/email=${email}/displayName`);
    return userDisplayName.data;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

const updateUserDisplayName = async (email: string, payload: any) => {
  try {
    await axiosInstance.patch(`/user/email=${email}/displayName`, payload);
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

const updateUserUsername = async (email: string, payload: any) => {
  try {
    await axiosInstance.patch(`/user/email=${email}/username`, payload);
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

const updateUserPhoneNumber = async (email: string, payload: any) => {
  try {
    await axiosInstance.patch(`/user/email=${email}/phoneNumber`, payload);
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

export {
  getUserInfo,
  getUsers,
  getUserDisplayName,
  updateUserProfileImage,
  updateUserDisplayName,
  updateUserPhoneNumber,
  updateUserUsername,
};
