import { Request, Response } from 'express';
import { Milestone } from '../models/Milestone';
import { Project } from '../models/Project';

const createMilestone = async (req: Request, res: Response) => {
  const { code } = req.params;
  const { title, description } = req.body;

  try {
    const newMilestone = await Milestone.create({ title, description });
    const project: any = await Project.findOne({ where: { code } });
    await project.addMilestone(newMilestone);

    res.status(200).json(newMilestone);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getProjectMilestones = async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const project: any = await Project.findOne({ where: { code } });
    const milestones = await project.getMilestones();

    res.status(200).json(milestones);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export { createMilestone, getProjectMilestones };
