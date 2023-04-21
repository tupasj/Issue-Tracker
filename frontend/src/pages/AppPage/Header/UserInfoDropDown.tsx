import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownItem } from '@/components/Dropdown';
import { logout } from '@/features/auth';
import { UserSetStatusModal } from '@/features/users';

const Container = styled.div`
  position: relative;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const Divider = styled.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.5);
  margin-top: 4px;
  margin-bottom: 4px;
`;

export const UserInfoDropDown = () => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setModalOpen(false);
  };

  const toggleDropdown = () => {
    if (!modalOpen) {
      if (dropdownActive) {
        setDropdownActive(false);
      } else if (!dropdownActive) {
        setDropdownActive(true);
      }
    }
  };

  const handleLogout = async () => {
    navigate('/sign-in');
    logout();
  };

  return (
    <Container onClick={toggleDropdown}>
      <StyledFontAwesomeIcon icon={faAngleDown} />
      <Dropdown dropdownActive={dropdownActive}>
        <DropdownItem clickable={false}>Regular user</DropdownItem>
        <Divider />
        <DropdownItem clickable={true} setModalOpen={setModalOpen}>
          Set status
        </DropdownItem>
        <DropdownItem clickable={true} onClickHandler={handleLogout}>
          Log out
        </DropdownItem>
      </Dropdown>
      <UserSetStatusModal
        modalOpen={modalOpen}
        handleClose={handleClose}
        setModalOpen={setModalOpen}
      />
    </Container>
  );
};
