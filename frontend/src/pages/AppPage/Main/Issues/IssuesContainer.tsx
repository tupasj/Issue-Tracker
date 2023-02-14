import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { issuesContext, projectsContext } from '@/context';
import { IssuesView, IssueView } from '@/pages/AppPage/Main/Issues';
import { useIssues } from '@/hooks';

export const IssuesContainer = () => {
  const navigate = useNavigate();
  const { currentProject } = projectsContext();
  const { issues, setIssues } = issuesContext();
  const allIssues = useIssues(currentProject);

  useEffect(() => {
    const filterOpenIssues = async () => {
      const openIssues = allIssues.filter((issue: any) => issue.is_open === true);
      setIssues(openIssues);
    };

    if (allIssues) {
      filterOpenIssues();
      navigate('/app/issues/open');
    }
  }, [allIssues]);

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
