import express from 'express';
import {
  createComment,
  getUserComments,
} from '../controllers/commentController';

const router = express.Router();

router
  .route('/issueNumber=:issueNumber/user/email=:email/comment')
  .post(createComment);
router
  .route('/issueNumber=:issueNumber/projectCode=:projectCode/comments')
  .get(getUserComments);

export default router;
