import { axiosInstance, axiosErrorHandler } from '@/lib/axios';

const register = async (userCredentials: any) => {
  try {
    const registerResponse = await axiosInstance.post('/user/register', userCredentials);
    return registerResponse;
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

const login = async (userCredentials: any) => {
  try {
    const loginResponse = await axiosInstance.post('/user/login', userCredentials);
    return loginResponse.data;
  } catch (error: any) {
    axiosErrorHandler(error);
    return error;
  }
};

const logout = async () => {
  try {
    await axiosInstance.delete('/user/logout');
  } catch (error: any) {
    axiosErrorHandler(error);
  }
};

export { register, login, logout };
