import { Request, Response } from 'express';
import { Milestone } from '../models/Milestone';
import { Project } from '../models/Project';
import { UserDisplayName } from '../models/UserDisplayName';

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

const getMilestoneIssues = async (req: Request, res: Response) => {
  const { code, id } = req.params;

  try {
    const project: any = await Project.findOne({ where: { code } });
    const milestone: any = await project.getMilestones({ where: { id } });
    const milestoneIssues = await milestone[0].getIssues();

    // Add postedBy and labels properties to each element in milestoneIssues array
    for (let i = 0; i < milestoneIssues.length; i++) {
      const user = await milestoneIssues[i].getUsers();
      const userDisplayName: any = await UserDisplayName.findOne({
        where: { userEmail: user[0].email },
      });
      milestoneIssues[i].setDataValue('postedBy', userDisplayName.display_name);
      const issueLabels = await milestoneIssues[i].getLabels();
      milestoneIssues[i].setDataValue('labels', issueLabels);
    }

    res.status(200).json(milestoneIssues);
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

const updateMilestone = async (req: Request, res: Response) => {
  const { code, id } = req.params;
  const { title, description } = req.body;

  try {
    await Milestone.update(
      { title: title, description: description },
      {
        where: {
          id: id,
          projectCode: code,
        },
      }
    );

    const updatedMilestone = await Milestone.findOne({
      where: {
        id: id,
        projectCode: code,
      },
    });
    res.status(200).json(updatedMilestone);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMilestone = async (req: Request, res: Response) => {
  const { code, id } = req.params;

  try {
    await Milestone.destroy({
      where: {
        id: id,
        projectCode: code,
      },
    });
    res.status(200).end();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export {
  createMilestone,
  getMilestoneIssues,
  getProjectMilestones,
  updateMilestone,
  deleteMilestone,
};
