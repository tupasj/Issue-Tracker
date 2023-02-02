import { Request, Response } from 'express';
import { Label } from '../models/Label';
import { Issue } from '../models/Issue';

const createLabel = async (req: Request, res: Response) => {
  const { issueNumber } = req.params;
  const { code, name, description, color } = req.body;

  try {
    const labelData = { name, description, color };
    const newLabel = await Label.create(labelData);
    const issue: any = await Issue.findOne({
      where: { issue_number: issueNumber, projectCode: code },
    });
    await issue.addLabel(newLabel);

    res.status(201).json(newLabel);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const addLabels = async (req: Request, res: Response) => {
  const { issueNumber } = req.params;
  const { code, labels } = req.body;

  try {
    const labelObjects: any[] = [];
    for (let i = 0; i < labels.length; i++) {
      const label = await Label.findOne({
        where: {
          name: labels[i].name,
        },
      });
      labelObjects.push(label);
    }
    const issue: any = await Issue.findOne({
      where: {
        projectCode: code,
        issue_number: issueNumber,
      },
    });
    await issue.addLabels(labels);
    res.status(200);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getDefaultLabels = async (req: Request, res: Response) => {
  try {
    const defaultLabels = await Label.findAll();
    res.status(200).json(defaultLabels);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getIssueLabels = async (req: Request, res: Response) => {
  try {
    res.status(200);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export { addLabels, getDefaultLabels };
