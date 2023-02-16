import { Routes, Route } from 'react-router-dom';
import { IssuesView } from './IssuesView';
import { IssueView } from './IssueView';

export const Issues = () => {
  return (
    <Routes>
      <Route path="/:openStatus" element={<IssuesView />} />
      <Route path="/:openStatus/:issueNumber" element={<IssueView />} />
    </Routes>
  );
};
