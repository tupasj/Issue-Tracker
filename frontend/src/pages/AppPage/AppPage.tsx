import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getUserInfo, getUserDisplayName } from '@/features/users';
import { UserContext, UserContextInterface, ProjectsContext } from '@/context';
import { Header } from '@/pages/AppPage/Header';
import { Sidebar } from '@/pages/AppPage/Sidebar';
import { Main } from '@/pages/AppPage';
import { getUserStatusColor } from '@/utils/userUtils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainArea = styled.div`
  display: flex;
  flex: 1 1 auto;
  @media (max-width: 768px) {
    flex-direction: column;
  }
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
  const [userType, setUserType] = useState('');
  const definedUserContext: UserContextInterface = {
    email: userEmail,
    displayName: userDisplayName,
    setDisplayName: setUserDisplayName,
    profileImage: imageURL,
    setProfileImage: setImageURL,
    status: userStatus,
    setStatus: setUserStatus,
    type: userType,
    setType: setUserType,
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo(userEmail as string);
      const userStatusColor = getUserStatusColor(userInfo.status);
      const status = { status: userInfo.status, color: userStatusColor };
      setUserStatus(status as any);
      setImageURL(userInfo.profile_image);
      setUserType(userInfo.type);
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
          <MainArea>
            <Sidebar />
            <Main />
          </MainArea>
        </ProjectsContext.Provider>
      </UserContext.Provider>
    </Container>
  );
};
