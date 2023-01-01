import styled from 'styled-components';
import { UserContext, UserContextInterface } from '@/context/UserContext';
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

type AppPageProps = {
  userEmail: string | null;
};

export const AppPage = ({ userEmail }: AppPageProps) => {
  const definedUserContext: UserContextInterface = {
    email: userEmail,
  };

  return (
    <Container>
      <UserContext.Provider value={definedUserContext}>
        <Header />
        <Sidebar />
        <Main />
      </UserContext.Provider>
    </Container>
  );
};
