import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { IssuesContainer } from '@/components/Main';
import { SettingsPage } from '@/pages';

const Container = styled.main`
  grid-area: main;
  padding: 22px;
`;

export const Main = () => {
  return (
    <Container>
      <Routes>
        <Route path="/issues" element={<IssuesContainer />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Container>
  );
};
