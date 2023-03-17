require('dotenv').config();
require('colors');
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes';
import issueRoutes from './routes/issueRoutes';
import { testDBConnection } from './config/database';
import { connectToMongoDB } from './utils/mongoDbUtils';
import { establishSequelizeAssociations } from './models/associations';

const app: Application = express();
const port = process.env.PORT || 5000;

testDBConnection();
connectToMongoDB();
establishSequelizeAssociations();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  },
});
const upload = multer({ storage: fileStorage });

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/user', userRoutes);
app.use('/projects', projectRoutes);
app.use('/issues', issueRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the backend');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
