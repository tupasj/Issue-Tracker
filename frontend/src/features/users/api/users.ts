import { axiosInstance, axiosErrorHandler } from '@/lib/axios';

const getUserInfo = async (email: string) => {
  try {
    const response = await axiosInstance.get(`/user/email=${email}`);
    return response.data;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

export { getUserInfo };
