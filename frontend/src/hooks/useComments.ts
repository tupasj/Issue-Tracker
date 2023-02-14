import { useState, useEffect } from 'react';
import { getComments } from '@/features/comments';

export const useComments = (currentIssueNumber: number, currentProjectCode: string) => {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await getComments(currentIssueNumber, currentProjectCode);
      setComments(comments);
    };

    fetchComments();
  }, []);

  return comments;
};
