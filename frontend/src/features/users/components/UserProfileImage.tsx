import styled from 'styled-components';
import { getUserStatusColor } from '@/utils/userUtils';
import { LoadingPlaceholder } from '@/elements';

type ContainerProps = {
  size: string;
};

const Container = styled.div<ContainerProps>`
  align-self: center;
  margin-left: 10px;
  margin-right: 4px;
  text-align: center;
  width: ${(props) => props.size}px;
  border: 2px solid var(--light-gray);
  border-radius: 50%;
  background-color: var(--white);
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Image = styled.img`
  position: relative;
  top: 1px;
  margin: -1px;
  width: 100%;
  border-radius: 50%;
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
  z-index: 1;
`;

type Props = {
  user: any;
  size: string;
  hoverText?: boolean;
  hideStatus?: boolean;
};

export const UserProfileImage = ({ user, size, hoverText, hideStatus }: Props) => {
  return (
    <Container size={size}>
      {user ? (
        <ImageWrapper>
          {!hideStatus && <StatusIndicator statusColor={getUserStatusColor(user.status)} />}
          <Image src={user.profile_image} />
        </ImageWrapper>
      ) : (
        <LoadingPlaceholder rounded={true} />
      )}
    </Container>
  );
};
