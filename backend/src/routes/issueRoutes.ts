import express from 'express';
import { createIssue } from '../controllers/issueController';

const router = express.Router();

router.route('/').post(createIssue);

export default router;
