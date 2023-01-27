import express from 'express';
import { createComment } from '../controllers/commentController';
import { createIssue } from '../controllers/issueController';

const router = express.Router();

router.route('/').post(createIssue);
router
  .route('/issueNumber=:issueNumber/user/email=:email/comment')
  .post(createComment);
router.route('/issueNumber=:issueNumber/comments');

export default router;
