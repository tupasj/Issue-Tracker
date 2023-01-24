import express from 'express';
import { createIssue, getProjectIssues } from '../controllers/issueController';
import {
  createProject,
  getProject,
  deleteProject,
  getUserProjects,
  removeUserFromProject,
} from '../controllers/projectController';

const router = express.Router();

router.route('/').post(createProject);
router.route('/code=:code').get(getProject).delete(deleteProject);
router.route('/code=:code/user/email=:email').delete(removeUserFromProject);
router.route('/user/email=:email').get(getUserProjects);
router.route('/issues').post(createIssue);
router.route('/code=:code/issues').get(getProjectIssues);

export default router;
