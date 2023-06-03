import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { PositionedMenu } from '@/components/UI';
import { LoadingPlaceholder } from '@/elements';
import { UserProfileImage } from './UserProfileImage';
import { UserModal } from './UserModal';
import { UserModalRemove } from './UserModalRemove';
import { UserModalPromote } from './UserModalPromote';

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
  setUsers: React.Dispatch<React.SetStateAction<any>>;
};

export const UserCard = ({ user, setUsers }: Props) => {
  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [removeUserModalOpen, setRemoveUserModalOpen] = useState(false);
  const [promoteUserModalOpen, setPromoteUserModalOpen] = useState(false);

  const handleOpen = () => {
    setUserInfoModalOpen(true);
  };
  const handleOpenRemoveUserModal = () => {
    setRemoveUserModalOpen(true);
  };
  const handleOpenPromoteUserModal = () => {
    setPromoteUserModalOpen(true);
  };

  const menuItems = [
    { title: 'View info', cb: handleOpen },
    { title: 'Make admin', cb: handleOpenPromoteUserModal },
    { title: 'Remove user', cb: handleOpenRemoveUserModal },
  ];

  return (
    <Container>
      <Left>
        <UserProfileImage user={user} size="70" />
        <UserInfoContainer>
          {user ? <DisplayName>{user.display_name}</DisplayName> : <LoadingPlaceholder />}
          {user ? <Type>{user.type}</Type> : <LoadingPlaceholder />}
        </UserInfoContainer>
      </Left>
      <Right>
        <PositionedMenu items={menuItems}>
          <StyledFontAwesomeIcon icon={faEllipsis} />
        </PositionedMenu>
      </Right>
      <UserModal
        open={userInfoModalOpen}
        handleClose={() => setUserInfoModalOpen(false)}
        userInfo={user}
      />
      <UserModalPromote
        open={promoteUserModalOpen}
        handleClose={() => setPromoteUserModalOpen(false)}
        userInfo={user}
        setUsers={setUsers}
      />
      <UserModalRemove
        open={removeUserModalOpen}
        handleClose={() => setRemoveUserModalOpen(false)}
        userInfo={user}
        setUsers={setUsers}
      />
    </Container>
  );
};
