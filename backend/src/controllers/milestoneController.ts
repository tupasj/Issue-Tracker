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
  const { code, openStatus } = req.params;
  const { isOpen } = req.query;

  try {
    const project: any = await Project.findOne({ where: { code } });

    let projectMilestones;
    if (openStatus) {
      projectMilestones = await project.getMilestones({
        where: { is_open: isOpen },
      });
    } else {
      projectMilestones = await project.getMilestones();
    }

    res.status(200).json(projectMilestones);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export { createMilestone, getProjectMilestones };
