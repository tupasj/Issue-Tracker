import express from 'express';
import request from 'supertest';
import issueRoutes from './issueRoutes';
import * as issueController from '../controllers/issueController';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/issues', issueRoutes);

describe('Issue routes', () => {
  test('POST Issue', () => {
    // Receive request data
    // Make a record in the database
    // Send back OK response
  });

  test('GET Issue', () => {});

  test('PUT Issue', () => {});

  test('DELETE Issue', () => {});
});
