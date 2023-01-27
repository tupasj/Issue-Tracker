import { Request, Response } from 'express';
import { Comment } from '../models/Comment';
import { Issue } from '../models/Issue';
import { User } from '../models/User';

const createComment = async (req: Request, res: Response) => {
  const { text_content } = req.body;
  const { issue_number, email } = req.params;

  try {
    const newComment: any = await Comment.create({ text_content });

    const issue: any = await Issue.findOne({ where: { issue_number } });
    await issue.addComment(newComment);
    const user: any = await User.findOne({ where: { email } });
    await user.addComment(newComment);

    newComment.display_name = user.display_name;
    res.status(201).json(newComment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export { createComment };
