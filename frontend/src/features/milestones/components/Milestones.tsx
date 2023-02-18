import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MilestonesView } from './MilestonesView';
import { MilestoneView } from './MilestoneView';

export const Milestones = () => {
  const [milestones, setMilestones] = useState<any[]>([]);

  return (
    <Routes>
      <Route
        path="/:openStatus"
        element={<MilestonesView milestones={milestones} setMilestones={setMilestones} />}
      />
      <Route path="/:openStatus/:milestoneId" element={<MilestoneView milestones={milestones} />} />
    </Routes>
  );
};
