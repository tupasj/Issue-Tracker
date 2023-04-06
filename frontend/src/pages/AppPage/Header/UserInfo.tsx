import styled from 'styled-components';
import { userContext } from '@/context/UserContext';
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

export const UserInfo = () => {
  const { profileImage, displayName } = userContext();

  return (
    <Container>
      <p>{displayName && displayName}</p>
      <ImageContainer>{profileImage && <Image src={profileImage} />}</ImageContainer>
      <UserInfoDropDown />
    </Container>
  );
};
