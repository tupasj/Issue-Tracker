import express from 'express';
import { createIssue, getProjectIssues } from '../controllers/issueController';
import {
  createProject,
  joinProject,
  getProject,
  deleteProject,
  getUserProjects,
  removeUserFromProject,
  updateProjectIssue,
  getProjectUsers,
} from '../controllers/projectController';

const router = express.Router();

router.route('/').post(createProject);
router
  .route('/code=:code')
  .get(getProject)
  .delete(deleteProject)
  .put(joinProject);
router.route('/code=:code/users').get(getProjectUsers);

router.route('/code=:code/user/email=:email').delete(removeUserFromProject);
router.route('/user/email=:email').get(getUserProjects);

router.route('/issues').post(createIssue);
router.route('/code=:code/issues/:openStatus?').get(getProjectIssues);
router
  .route('/code=:code/issue/issueNumber=:issueNumber')
  .patch(updateProjectIssue);

export default router;
