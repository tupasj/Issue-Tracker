import styled from 'styled-components';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { IssuesContext } from '@/context';
import { Issues } from '@/features/issues';
import { Dashboard } from '@/features/dashboard';
import { Settings } from './Settings';

const Container = styled.main`
  grid-area: main;
  padding: 22px;
`;

export const Main = () => {
  const [issues, setIssues] = useState<any[]>([]);

  return (
    <Container>
      <IssuesContext.Provider value={{ issues, setIssues }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/issues/*" element={<Issues />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </IssuesContext.Provider>
    </Container>
  );
};
