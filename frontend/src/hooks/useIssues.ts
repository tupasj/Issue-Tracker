import { useState, useEffect } from 'react';
import { getIssues } from '@/features/issues';

export const useIssues = (currentProject: any) => {
  const [issues, setIssues] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      const issues = await getIssues(currentProject);
      setIssues(issues);
    };

    fetchIssues();
  }, []);

  useEffect(() => {
    if (issues[0]) {
      setIsLoading(false);
    }
  }, [issues]);

  return { issues, isLoading };
};
