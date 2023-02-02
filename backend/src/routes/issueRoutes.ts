import express from 'express';
import {
  createComment,
  getUserComments,
} from '../controllers/commentController';
import { addLabels, getDefaultLabels } from '../controllers/labelController';

const router = express.Router();

router
  .route('/issueNumber=:issueNumber/user/email=:email/comment')
  .post(createComment);
router
  .route('/issueNumber=:issueNumber/projectCode=:projectCode/comments')
  .get(getUserComments);
router
  .route('/issueNumber=:issueNumber/labels')
  .post(addLabels)
  .get(getDefaultLabels);

export default router;
