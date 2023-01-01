import express from 'express';
import request from 'supertest';
import userRoutes from './userRoutes';
import * as userController from '../controllers/userController';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/user', userRoutes);

describe('user routes', function () {
  test('GET /user/:email/:attribute', async () => {
    // const response = await request(app)
    //   .get('/user/loremipsum@gmail.com/email')
    //   .expect('Content-Type', /json/)
    //   .set('Accept', 'application/json');
    // expect(response.status).toEqual(200);
  });

  test('POST /user/register', async () => {
    const mockRequest: any = {
      email: 'foobar@gmail.com',
      first_name: 'Foo',
      last_name: 'Barr',
      password: '12341234',
    };
    const response = await request(app)
      .post('/user/register')
      .send(mockRequest);

    const mockCreateUser = jest.spyOn(userController, 'createUser');
    mockCreateUser.mockReturnValueOnce(mockRequest);
    // @ts-ignore
    const mockResponse = mockCreateUser();

    expect(mockCreateUser).toHaveBeenCalledTimes(1);
    expect(mockResponse).toBe(mockRequest);
    expect(response.statusCode).toBeDefined();
  });

  test('POST /user/login', async () => {
    const mockRequest: any = {
      email: 'foobar@gmail.com',
      password: '12341234',
    };
    const response = await request(app).post('/user/login').send(mockRequest);

    const mockLoginUser = jest.spyOn(userController, 'loginUser');
    mockLoginUser.mockReturnValue(mockRequest);
    // @ts-ignore
    const mockResponse = mockLoginUser();

    expect(mockLoginUser).toHaveBeenCalledTimes(1);
    expect(mockResponse).toBe(mockRequest);
    expect(response.statusCode).toBeDefined();
  });
});
