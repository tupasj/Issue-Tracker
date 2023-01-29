import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { ProjectsContext } from '@/context';
import { IssuesContainer } from '@/components/Issues';
import { Settings } from '@/components/Settings';
import { IssueView } from '@/components/Issues';

const Container = styled.main`
  grid-area: main;
  padding: 22px;
`;

export const Main = () => {
  const [issues, setIssues] = useState<any[]>([]);
  const { currentProject } = useContext(ProjectsContext) as any;

  const getIssues = async () => {
    try {
      const issues = await axiosInstance.get(`/projects/code=${currentProject.code}/issues`);
      setIssues(issues.data);
    } catch (error: any) {
      axiosErrorHandler(error);
    }
  };

  return (
    <Container>
      <Routes>
        <Route
          path="/issues"
          element={<IssuesContainer issues={issues} getIssues={getIssues} setIssues={setIssues} />}
        />
        <Route path="/issues/:issueNumber" element={<IssueView issues={issues} />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Container>
  );
};
