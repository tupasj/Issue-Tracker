import styled from 'styled-components';
import { getUserStatusColor } from '@/utils/userUtils';
import { LoadingPlaceholder } from '@/elements';

const Container = styled.div`
  padding: 4px;
  align-self: center;
  height: 36px;
  width: 36px;
  text-align: center;
  border: 1px solid var(--light-gray);
  border-radius: 50%;
  background-color: var(--white);
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 36px;
`;

type StatusIndicatorProps = {
  statusColor: any;
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

type Props = {
  user: any;
  hoverText?: boolean;
};

export const UserProfileImage = ({ user, hoverText }: Props) => {
  return (
    <Container>
      {user ? (
        <ImageWrapper>
          <StatusIndicator statusColor={getUserStatusColor(user.status)} />
          <Image src={user.profile_image} />
        </ImageWrapper>
      ) : (
        <LoadingPlaceholder rounded={true} />
      )}
    </Container>
  );
};
