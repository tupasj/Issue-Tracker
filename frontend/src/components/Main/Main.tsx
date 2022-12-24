import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { IssuesContainer } from '@/components/Main';

const Container = styled.main`
  grid-area: main;
  padding: 22px;
`;

export const Main = () => {
  return (
    <Container>
      <Routes>
        <Route path="/issues" element={<IssuesContainer />} />
      </Routes>
    </Container>
  );
};
