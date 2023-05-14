import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { PositionedMenu } from '@/components/UI';
import { LoadingPlaceholder } from '@/elements';
import { UserProfileImage } from './UserProfileImage';
import { UserModal } from './UserModal';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  background-color: var(--white);
  cursor: pointer;
  &:hover {
    background-color: var(--extra-light-gray);
  }
`;

const Left = styled.div`
  display: flex;
  gap: 8px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  padding-right: 12px;
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

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 1.25rem;
  color: var(--black);
`;

type Props = {
  user: any;
};

export const UserCard = ({ user }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  return (
    <Container>
      <Left>
        <UserProfileImage user={user} />
        <UserInfoContainer>
          {user ? <DisplayName>{user.display_name}</DisplayName> : <LoadingPlaceholder />}
          {user ? <Type>{user.type}</Type> : <LoadingPlaceholder />}
        </UserInfoContainer>
      </Left>
      <Right>
        <PositionedMenu items={[{ title: 'View info', cb: handleOpen }]}>
          <StyledFontAwesomeIcon icon={faEllipsis} />
        </PositionedMenu>
      </Right>
      <UserModal open={modalOpen} handleClose={() => setModalOpen(false)} userInfo={user} />
    </Container>
  );
};
