import express from 'express';
import { createIssue, getIssue } from '../controllers/issueController';

const router = express.Router();

router.route('/').post(createIssue).get(getIssue);

export default router;
