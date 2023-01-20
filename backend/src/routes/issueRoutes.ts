import express from 'express';
import { getIssue } from '../controllers/issueController';

const router = express.Router();

router.route('/').get(getIssue);

export default router;
