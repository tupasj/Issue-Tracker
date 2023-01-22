import express from 'express';
import request from 'supertest';
import issueRoutes from '../issueRoutes';
import * as issueController from '../../controllers/issueController';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/issues', issueRoutes);

describe('Issue routes', () => {
  test('POST Issue', async () => {
    const mockRequest: any = {
      email: 'foobar@gmail.com',
      title: 'Test Issue',
      priority: 'medium',
    };
    const response = await request(app).post('/issues').send(mockRequest);

    const mockcreateIssue: any = jest.spyOn(issueController, 'createIssue');
    mockcreateIssue.mockReturnValueOnce(mockRequest);
    const mockResponse = mockcreateIssue();

    expect(mockcreateIssue).toHaveBeenCalledTimes(1);
    expect(mockResponse).toBe(mockRequest);
    expect(response.statusCode).toBeDefined();
  });
});
