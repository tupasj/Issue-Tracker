require('dotenv').config();
require('colors');
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes';
import { testDBConnection } from './config/database';
import { connectToMongoDB } from './utils/mongoDbUtils';

const app: Application = express();
const port = process.env.PORT || 5000;

testDBConnection();
connectToMongoDB();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/user', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the backend');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
