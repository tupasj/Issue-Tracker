import styled from 'styled-components';
import { userContext } from '@/context/UserContext';
import { useUserInfo } from '@/hooks';
import { LoadingPlaceholder } from '@/elements';

const Container = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  background-color: var(--white);
  cursor: pointer;
  &:hover {
    background-color: var(--extra-light-gray);
  }
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

const ImageWrapper = styled.div`
  position: relative;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DisplayName = styled.div`
  font-weight: 600;
  line-height: 1.5;
  cursor: pointer;
  &:hover {
    color: var(--blue);
  }
`;

const Type = styled.div`
  color: var(--light-medium-gray);
`;

type StatusIndicatorProps = {
  statusColor: string;
};

const StatusIndicator = styled.div<StatusIndicatorProps>`
  display: inherit;
  position: absolute;
  bottom: 2px;
  left: -5px;
  height: 10px;
  width: 10px;
  border: 1px solid var(--light-gray);
  border-radius: 50%;
  background-color: ${(props) => props.statusColor};
`;

export const UserCard = () => {
  const { email } = userContext();
  const userInfo = useUserInfo(email);
  // const userInfo = false;

  return (
    <Container>
      <ImageContainer>
        {userInfo ? (
          <ImageWrapper>
            <StatusIndicator statusColor={userInfo.statusColor} />
            <Image src={userInfo.profile_image} />
          </ImageWrapper>
        ) : (
          <LoadingPlaceholder rounded={true} />
        )}
      </ImageContainer>
      <UserInfoContainer>
        {userInfo ? <DisplayName>{userInfo.displayName}</DisplayName> : <LoadingPlaceholder />}
        {userInfo ? <Type>{userInfo.type}</Type> : <LoadingPlaceholder />}
      </UserInfoContainer>
    </Container>
  );
};
