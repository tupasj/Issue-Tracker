import { useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { ProjectsContext } from '@/context';
import { IssuesView, IssueView } from '@/components/Issues';

export const IssuesContainer = () => {
  const [issues, setIssues] = useState<any[]>([]);
  const { currentProject } = useContext(ProjectsContext) as any;
  const navigate = useNavigate();

  const getIssues = async () => {
    try {
      const issuesResponse = await axiosInstance.get(
        `/projects/code=${currentProject.code}/issues`
      );
      return issuesResponse.data;
    } catch (error: any) {
      axiosErrorHandler(error);
    }
  };

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
