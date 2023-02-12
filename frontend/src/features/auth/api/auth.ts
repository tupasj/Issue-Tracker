import { axiosInstance, axiosErrorHandler } from '@/lib/axios';

const logout = async () => {
  try {
    await axiosInstance.delete('/user/logout');
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

export { logout };
