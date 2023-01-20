import { describe, expect, it, vi } from 'vitest';
import { axiosInstance } from '@/lib/axios';

describe('Display user info', () => {
  it('Makes a GET request to the correct endpoint', async () => {
    const email = 'testuser@gmail.com';
    const mockResponseData = {
      data: {
        email: 'email',
        current_project: 'current project',
        username: null,
        first_name: null,
        last_name: null,
        phone_number: null,
        profile_image: null,
        project_codes: null,
        status: null,
        type: 'regular',
      },
    };
    const axiosInstanceSpy = vi
      .spyOn(axiosInstance, 'get')
      .mockImplementation(async () => mockResponseData);
    const response = await axiosInstance.get(`/user/email=${email}`);
    expect(axiosInstanceSpy).toHaveBeenCalledOnce();
    expect(axiosInstanceSpy).toHaveBeenCalledWith(`/user/email=${email}`);
    expect(response).toEqual(mockResponseData);
  });
});
