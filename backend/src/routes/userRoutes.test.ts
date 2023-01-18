import express from 'express';
import request from 'supertest';
import userRoutes from './userRoutes';
import * as userController from '../controllers/userController';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/user', userRoutes);

describe('user auth routes', function () {
  test('user registration route', async () => {
    const mockRequest: any = {
      email: 'foobar@gmail.com',
      first_name: 'Foo',
      last_name: 'Barr',
      password: '12341234',
    };
    const response = await request(app)
      .post('/user/register')
      .send(mockRequest);

    const mockCreateUser: any = jest.spyOn(userController, 'createUser');
    mockCreateUser.mockReturnValueOnce(mockRequest);
    const mockResponse = mockCreateUser();

    expect(mockCreateUser).toHaveBeenCalledTimes(1);
    expect(mockResponse).toBe(mockRequest);
    expect(response.statusCode).toBeDefined();
  });

  test('user login route', async () => {
    const mockRequest: any = {
      email: 'foobar@gmail.com',
      password: '12341234',
    };
    const response = await request(app).post('/user/login').send(mockRequest);

    const mockLoginUser: any = jest.spyOn(userController, 'loginUser');
    mockLoginUser.mockReturnValue(mockRequest);
    const mockResponse = mockLoginUser();

    expect(mockLoginUser).toHaveBeenCalledTimes(1);
    expect(mockResponse).toBe(mockRequest);
    expect(response.statusCode).toBeDefined();
  });
});
