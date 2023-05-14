import express from 'express';
import {
  createComment,
  getUserComments,
} from '../controllers/commentController';
import { addLabels, getDefaultLabels } from '../controllers/labelController';
import {
  getUserIssues,
  getIssueLabels,
  updateIssueLabels,
  updateIssuePriority,
  updateIssueTitle,
  updateIssueAssignees,
  deleteIssue,
  getIssueUsers,
  assignIssueUsers,
  getIssueMilestone,
  updateIssueMilestone,
  removeIssueMilestone,
} from '../controllers/issueController';

const router = express.Router();

router
  .route('/issueNumber=:issueNumber/projectCode=:projectCode/labels')
  .get(getIssueLabels);
router
  .route('/issueNumber=:issueNumber/projectCode=:projectCode')
  .delete(deleteIssue);
router
  .route('/issueNumber=:issueNumber/projectCode=:projectCode/priority')
  .patch(updateIssuePriority);
router
  .route('/issueNumber=:issueNumber/projectCode=:projectCode/title')
  .patch(updateIssueTitle);
router
  .route('/issueNumber=:issueNumber/projectCode=:projectCode/assignees')
  .put(updateIssueAssignees);

router.route('/user/email=:email/issues/:openStatus?').get(getUserIssues);
router
  .route('/issueNumber=:issueNumber/projectCode=:projectCode/comments')
  .get(getUserComments);

router
  .route('/issueNumber=:issueNumber/user/email=:email/comment')
  .post(createComment);

router
  .route('/issueNumber=:issueNumber/labels')
  .post(addLabels)
  .get(getDefaultLabels);
router
  .route('/issueNumber=:issueNumber/projectCode=:projectCode/labels')
  .patch(updateIssueLabels);

router
  .route('/issueNumber=:issueNumber/projectCode=:projectCode/users')
  .put(assignIssueUsers)
  .get(getIssueUsers);

router
  .route('/issueNumber=:issueNumber/projectCode=:projectCode/milestone')
  .get(getIssueMilestone)
  .put(updateIssueMilestone)
  .delete(removeIssueMilestone);

export default router;
