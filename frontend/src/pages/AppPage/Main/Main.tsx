import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '@/components/Dashboard';
import { IssuesContainer } from '@/components/Issues';
import { Settings } from '@/components/Settings';

const Container = styled.main`
  grid-area: main;
  padding: 22px;
`;

export const Main = () => {
  return (
    <Container>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/issues/*" element={<IssuesContainer />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Container>
  );
};
