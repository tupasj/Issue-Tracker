import styled from 'styled-components';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Main } from '@/components/Main';

const Container = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 54px 1fr;
  grid-template-areas:
    'header header'
    'sidebar main';
  min-height: 100vh;
`;

export const AppPage = () => {
  return (
    <Container>
      <Header />
      <Sidebar />
      <Main />
    </Container>
  );
};
