import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { UserContext } from '@/context/UserContext';
import { UserInfoDropDown } from '@/pages/AppPage/Header';

const Container = styled.div`
  position: absolute;
  right: 22px;
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  padding: 4px;
  align-self: center;
  margin-left: 10px;
  margin-right: 4px;
  height: 36px;
  width: 36px;
  text-align: center;
  border: 1px solid var(--light-gray);
  border-radius: 50%;
  background-color: var(--white);
  cursor: pointer;
`;

const Image = styled.img`
  width: 36px;
`;

type UserInfo = {
  email?: string;
  first_name?: string;
  last_name?: string;
  profile_image?: string;
};

export const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const getUserInfo = async () => {
      const email = userCtx?.email;
      try {
        const response = await axiosInstance.get(`/user/email=${email}`);
        setUserInfo(response.data);
      } catch (error: any) {
        axiosErrorHandler(error);
        // navigate('/sign-in');
      }
    };
    getUserInfo();
  }, []);

  return (
    <Container>
      {userInfo && (
        <p>
          {userInfo.first_name} {userInfo.last_name}
        </p>
      )}
      <ImageContainer>
        <Image src={userInfo?.profile_image} />
      </ImageContainer>
      <UserInfoDropDown />
    </Container>
  );
};
