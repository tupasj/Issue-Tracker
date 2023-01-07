import styled from 'styled-components';
import { UserContext, UserContextInterface, CurrentProjectContext } from '@/context';
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

type Props = {
  userEmail: string | null;
  currentProject: any | null;
  setCurrentProject: React.Dispatch<React.SetStateAction<any>>;
};

export const AppPage = ({ userEmail, currentProject, setCurrentProject }: Props) => {
  const definedUserContext: UserContextInterface = {
    email: userEmail,
  };

  return (
    <Container>
      <UserContext.Provider value={definedUserContext}>
        <CurrentProjectContext.Provider value={{ currentProject, setCurrentProject }}>
          <Header />
          <Sidebar />
          <Main />
        </CurrentProjectContext.Provider>
      </UserContext.Provider>
    </Container>
  );
};
