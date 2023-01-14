import express from 'express';
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

export default router;
