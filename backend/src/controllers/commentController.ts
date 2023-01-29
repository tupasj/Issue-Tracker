import { Request, Response } from 'express';
import { Comment } from '../models/Comment';
import { Issue } from '../models/Issue';
import { User } from '../models/User';
import { UserDisplayName } from '../models/UserDisplayName';

const createComment = async (req: Request, res: Response) => {
  const { text_content } = req.body;
  const { issueNumber, email } = req.params;

  try {
    const newComment: any = await Comment.create({ text_content });

    const issue: any = await Issue.findOne({
      where: { issue_number: issueNumber },
    });
    const user: any = await User.findOne({ where: { email } });
    await issue.addComment(newComment);
    await user.addComment(newComment);

    // add profile_image and display_name properties to newComment
    const commentUser: any = await User.findOne({ where: { email } });
    newComment.setDataValue('profile_image', commentUser.profile_image);
    const commentUserDisplayName: any = await UserDisplayName.findOne({
      where: { userEmail: email },
    });
    newComment.setDataValue(
      'display_name',
      commentUserDisplayName.display_name
    );

    res.status(201).json(newComment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getUserComments = async (req: Request, res: Response) => {
  const { issueNumber } = req.params;

  try {
    const issue: any = await Issue.findOne({
      where: { issue_number: issueNumber },
    });
    const comments = await issue.getComments();

    // add profile_image and display_name properties to each comment
    for (let i = 0; i < comments.length; i++) {
      const commentUser: any = await User.findOne({
        where: { email: comments[i].userEmail },
      });
      comments[i].setDataValue('profile_image', commentUser.profile_image);
      const commentUserDisplayName: any = await UserDisplayName.findOne({
        where: { userEmail: comments[i].userEmail },
      });
      comments[i].setDataValue(
        'display_name',
        commentUserDisplayName.display_name
      );
    }

    res.status(200).json(comments);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export { createComment, getUserComments };
