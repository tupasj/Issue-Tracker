import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getUserInfo, getUserDisplayName } from '@/features/users';
import { UserContext, UserContextInterface, ProjectsContext } from '@/context';
import { Header } from '@/pages/AppPage/Header';
import { Sidebar } from '@/pages/AppPage/Sidebar';
import { Main } from '@/pages/AppPage';
import { getUserStatusColor } from '@/utils/userUtils';

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
  const [userDisplayName, setUserDisplayName] = useState('');
  const [userStatus, setUserStatus] = useState();
  const definedUserContext: UserContextInterface = {
    email: userEmail,
    displayName: userDisplayName,
    setDisplayName: setUserDisplayName,
    profileImage: imageURL,
    setProfileImage: setImageURL,
    status: userStatus,
    setStatus: setUserStatus,
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo(userEmail as string);
      const userStatusColor = getUserStatusColor(userInfo.status);
      const status = { status: userInfo.status, color: userStatusColor };
      setUserStatus(status as any);
      setImageURL(userInfo.profile_image);
    };
    const fetchUserDisplayName = async () => {
      const userDisplayName = await getUserDisplayName(userEmail as string);
      setUserDisplayName(userDisplayName);
    };

    fetchUserInfo();
    fetchUserDisplayName();
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
