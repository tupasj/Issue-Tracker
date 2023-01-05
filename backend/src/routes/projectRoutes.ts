import express from 'express';
import { createProject, getProject } from '../controllers/projectController';

const router = express.Router();

router.route('/').post(createProject);
router.route('/:code').get(getProject);

export default router;
