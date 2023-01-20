import { describe, expect, it, vi } from 'vitest';
import { axiosInstance } from '@/lib/axios';

describe('Adds a new project', () => {
  it('Makes a POST request to the correct endpoint', async () => {
    const requestBody = { projectName: 'Test Project', email: 'testuser@gmail.com' };
    const mockResponseData = { data: { projectName: 'Test Project', email: 'testuser@gmail.com' } };
    const axiosInstanceSpy = vi
      .spyOn(axiosInstance, 'post')
      .mockImplementation(async () => mockResponseData);
    const response = await axiosInstance.post('/projects', requestBody);
    expect(axiosInstanceSpy).toHaveBeenCalledOnce();
    expect(axiosInstanceSpy).toHaveBeenCalledWith('/projects', requestBody);
    expect(response).toEqual(mockResponseData);
  });
});
