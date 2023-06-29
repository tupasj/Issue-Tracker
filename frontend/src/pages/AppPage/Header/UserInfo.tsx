import styled from 'styled-components';
import { userContext } from '@/context/UserContext';
import { UserInfoDropDown } from '@/pages/AppPage/Header';

const Container = styled.div`
  right: 22px;
  display: flex;
  align-items: center;
`;

const DisplayNameContainer = styled.div`
  text-align: right;
  line-height: 1.25;
`;

const ImageContainer = styled.div`
  align-self: center;
  margin-left: 8px;
  margin-right: 4px;
  text-align: center;
  border: 2px solid var(--light-gray);
  border-radius: 50%;
  background-color: var(--white);
  cursor: pointer;
`;

const Image = styled.img`
  position: relative;
  width: 42px;
  border-radius: 50%;
  top: 1px;
  margin: -1px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const StatusIndicator = styled.div.attrs((props: { statusColor: string }) => props)`
  display: inherit;
  position: absolute;
  bottom: 2px;
  left: -5px;
  height: 10px;
  width: 10px;
  border: 1px solid var(--light-gray);
  border-radius: 50%;
  background-color: ${(props) => props.statusColor};
  z-index: 1;
`;

export const UserInfo = () => {
  const { profileImage, displayName, status } = userContext();

  return (
    <Container>
      {displayName && <DisplayNameContainer>{displayName}</DisplayNameContainer>}
      <ImageContainer>
        {profileImage && (
          <ImageWrapper>
            <StatusIndicator statusColor={status.color} />
            <Image src={profileImage} />
          </ImageWrapper>
        )}
      </ImageContainer>
      <UserInfoDropDown />
    </Container>
  );
};
