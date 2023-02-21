import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { IssueView } from '@/features/issues';
import { MilestonesView } from './MilestonesView';
import { MilestoneView } from './MilestoneView';

export const Milestones = () => {
  const [milestones, setMilestones] = useState<any[]>([]);

  return (
    <Routes>
      <Route
        path="/:milestonesOpenStatus"
        element={<MilestonesView milestones={milestones} setMilestones={setMilestones} />}
      />
      <Route
        path="/:milestonesOpenStatus/:milestoneId"
        element={<MilestoneView milestones={milestones} setMilestones={setMilestones} />}
      />
      <Route
        path="/:milestonesOpenStatus/:milestoneId/issues/:issuesOpenStatus/:issueNumber"
        element={<IssueView />}
      />
    </Routes>
  );
};
