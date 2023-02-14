import { useState, useEffect } from 'react';
import { getIssues } from '@/features/issues';

export const useIssues = (
  currentProject: any,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [issues, setIssues] = useState<any[]>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      const issues = await getIssues(currentProject);
      setIssues(issues);
    };

    fetchIssues();
  }, []);

  useEffect(() => {
    if (setLoading && issues[0]) {
      // @ts-ignore
      setLoading(false);
    }
  }, [issues]);

  return issues;
};
