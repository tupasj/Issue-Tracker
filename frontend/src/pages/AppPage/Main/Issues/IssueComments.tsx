import { useEffect } from 'react';
import { getComments, Comments } from '@/features/comments';

type Props = {
  comments: any;
  setComments: React.Dispatch<React.SetStateAction<any>>;
  currentIssueNumber: number;
  currentProjectCode: string;
};

export const IssueComments = ({
  comments,
  setComments,
  currentIssueNumber,
  currentProjectCode,
}: Props) => {
  useEffect(() => {
    const fetchComments = async () => {
      const commentsResponse = await getComments(currentIssueNumber, currentProjectCode);
      setComments(commentsResponse);
    };

    fetchComments();
  }, []);

  return <Comments comments={comments} />;
};
