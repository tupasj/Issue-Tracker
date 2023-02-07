import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { issuesContext } from '@/context';
import { IssuesView, IssueView } from '@/components/Issues';

export const IssuesContainer = () => {
  const navigate = useNavigate();
  const { issues, setIssues, getIssues } = issuesContext();

  useEffect(() => {
    const filterOpenIssues = async () => {
      const issues = await getIssues();
      const openIssues = issues.filter((issue: any) => issue.is_open === true);
      setIssues(openIssues);
    };
    getIssues();
    filterOpenIssues();
    navigate('/app/issues/open');
  }, []);

  return (
    <Routes>
      <Route
        path="/:openStatus"
        element={<IssuesView issues={issues} setIssues={setIssues} getIssues={getIssues} />}
      />
      <Route
        path="/:openStatus/:issueNumber"
        element={<IssueView issues={issues} setIssues={setIssues} />}
      />
    </Routes>
  );
};
