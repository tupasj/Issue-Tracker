import { useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { ProjectsContext } from '@/context';
import { IssuesView, IssueView } from '@/components/Issues';

export const IssuesContainer = () => {
  const [issues, setIssues] = useState<any[]>([]);
  const [openActive, setOpenActive] = useState(true);
  const [closedActive, setClosedActive] = useState(false);
  const { currentProject } = useContext(ProjectsContext) as any;
  const navigate = useNavigate();

  const getIssues = async () => {
    try {
      const issues = await axiosInstance.get(`/projects/code=${currentProject.code}/issues`);
      setIssues(issues.data);
    } catch (error: any) {
      axiosErrorHandler(error);
    }
  };

  useEffect(() => {
    getIssues();
    navigate('/app/issues/open');
  }, []);

  return (
    <Routes>
      <Route
        path="/:openStatus"
        element={
          <IssuesView
            issues={issues}
            setIssues={setIssues}
            openActive={openActive}
            closedActive={closedActive}
            setOpenActive={setOpenActive}
            setClosedActive={setClosedActive}
          />
        }
      />
      <Route
        path="/:openStatus/:issueNumber"
        element={<IssueView issues={issues} setIssues={setIssues} />}
      />
    </Routes>
  );
};
