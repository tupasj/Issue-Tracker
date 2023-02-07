import styled from 'styled-components';
import { useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { IssuesContext, ProjectsContext } from '@/context';
import { Dashboard } from '@/components/Dashboard';
import { IssuesContainer } from '@/components/Issues';
import { Settings } from '@/components/Settings';

const Container = styled.main`
  grid-area: main;
  padding: 22px;
`;

export const Main = () => {
  const [issues, setIssues] = useState<any[]>([]);
  const { currentProject } = useContext(ProjectsContext) as any;

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

  return (
    <Container>
      <IssuesContext.Provider value={{ issues, setIssues, getIssues }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/issues/*" element={<IssuesContainer />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </IssuesContext.Provider>
    </Container>
  );
};
