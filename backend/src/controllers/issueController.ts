import { Request, Response } from 'express';
import { db, QueryTypes } from '../config/database';
import { Issue } from '../models/Issue';

const createIssue = async (req: Request, res: Response) => {
  // req body: title, posted_by, priority
  // other: number is based on entry order in specific Project
};

const getIssue = async (req: Request, res: Response) => {};

export { createIssue, getIssue };
