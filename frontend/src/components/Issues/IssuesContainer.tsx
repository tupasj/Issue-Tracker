import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { issuesContext, projectsContext } from '@/context';
import { IssuesView, IssueView } from '@/components/Issues';
import { getIssues } from '@/features/issues';

export const IssuesContainer = () => {
  const navigate = useNavigate();
  const { currentProject } = projectsContext();
  const { issues, setIssues } = issuesContext();

  useEffect(() => {
    const filterOpenIssues = async () => {
      const issues = await getIssues(currentProject);
      const openIssues = issues.filter((issue: any) => issue.is_open === true);
      setIssues(openIssues);
    };
    filterOpenIssues();
    navigate('/app/issues/open');
  }, []);

  return (
    <Routes>
      <Route path="/:openStatus" element={<IssuesView issues={issues} setIssues={setIssues} />} />
      <Route
        path="/:openStatus/:issueNumber"
        element={<IssueView issues={issues} setIssues={setIssues} />}
      />
    </Routes>
  );
};
