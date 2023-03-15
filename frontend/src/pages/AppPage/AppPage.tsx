import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getUserProfileImage } from '@/features/users';
import { UserContext, UserContextInterface, ProjectsContext } from '@/context';
import { Header } from '@/pages/AppPage/Header';
import { Sidebar } from '@/pages/AppPage/Sidebar';
import { Main } from '@/pages/AppPage';

const Container = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 5.5% 94.5%;
  grid-template-areas:
    'header header'
    'sidebar main';
  height: 100vh;
`;

type Props = {
  userEmail: string | null;
  currentProject: any | null;
  setCurrentProject: React.Dispatch<React.SetStateAction<any>>;
  projects: any | null;
  setProjects: React.Dispatch<React.SetStateAction<any>>;
};

export const AppPage = ({
  userEmail,
  currentProject,
  setCurrentProject,
  projects,
  setProjects,
}: Props) => {
  const [imageURL, setImageURL] = useState('');
  const definedUserContext: UserContextInterface = {
    email: userEmail,
    profileImage: imageURL,
    setProfileImage: setImageURL,
  };

  useEffect(() => {
    const fetchUserProfileImage = async () => {
      const userProfileImage = await getUserProfileImage(userEmail as string);
      setImageURL(userProfileImage);
    };

    fetchUserProfileImage();
  }, []);

  return (
    <Container>
      <UserContext.Provider value={definedUserContext}>
        <ProjectsContext.Provider
          value={{ currentProject, setCurrentProject, projects, setProjects }}
        >
          <Header />
          <Sidebar />
          <Main />
        </ProjectsContext.Provider>
      </UserContext.Provider>
    </Container>
  );
};
