import { useState, useEffect } from 'react';
import { getMilestoneIssues } from '@/features/milestones';

export const useMilestoneIssues = (
  currentProject: any,
  milestoneId: number,
  openStatus?: string
) => {
  const [milestoneIssues, setMilestoneIssues] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMilestoneIssues = async () => {
      const milestoneIssues = await getMilestoneIssues(currentProject, milestoneId);
      setMilestoneIssues(milestoneIssues);
    };
    const fetchMilestoneIssuesFiltered = async () => {
      const milestoneIssuesFiltered = await getMilestoneIssues(
        currentProject,
        milestoneId,
        openStatus
      );
      setMilestoneIssues(milestoneIssuesFiltered);
    };

    if (openStatus) {
      fetchMilestoneIssuesFiltered();
    } else {
      fetchMilestoneIssues();
    }
  }, []);

  useEffect(() => {
    if (milestoneIssues[0]) {
      setIsLoading(false);
    } else if (milestoneIssues != undefined) {
      setIsLoading(false);
    }
  }, [milestoneIssues]);

  return { milestoneIssues, isLoading };
};
