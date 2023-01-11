import express from 'express';
import {
  createProject,
  getProject,
  deleteProject,
} from '../controllers/projectController';

const router = express.Router();

router.route('/').post(createProject);
router.route('/:code').get(getProject).delete(deleteProject);

export default router;
