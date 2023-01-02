import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { UserContext } from '@/context/UserContext';
import { UserInfoDropDown } from '@/components/Header';

const Container = styled.div`
  position: absolute;
  right: 22px;
  display: flex;
  align-items: center;
`;

const ImgPlaceholder = styled.div`
  background-color: black;
  border-radius: 50%;
  align-self: center;
  height: 46px;
  width: 46px;
  margin-left: 10px;
  margin-right: 4px;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  padding-right: 6px;
  padding-left: 12px;
  height: 38px;
`;

const WrappedIcon = styled(FontAwesomeIcon)`
  height: 100%;
`;

type UserInfo = {
  email?: string;
  profile_picture?: string;
};

export const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const fetchdata = async () => {
      // @ts-ignore
      const email = userCtx.email;
      try {
        await axiosInstance.get(`/user/${email}/attributes?email=${email}`);
      } catch (error: any) {
        axiosErrorHandler(error);
      }
    };
    fetchdata();
  }, []);

  return (
    <Container>
      {userCtx && <p>{userCtx.email}</p>}
      {userInfo ? (
        <ImgPlaceholder>
          <img src={userInfo.profile_picture} alt="profile-image" />
        </ImgPlaceholder>
      ) : (
        <IconWrapper>
          <WrappedIcon icon={faCircleUser} />
        </IconWrapper>
      )}
      <UserInfoDropDown />
    </Container>
  );
};
