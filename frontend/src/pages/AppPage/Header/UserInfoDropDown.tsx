import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownItem } from '@/components/Dropdown';
import { logout } from '@/features/auth';

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
  const navigate = useNavigate();

  const toggleDropdown = () => {
    if (dropdownActive) {
      setDropdownActive(false);
    } else if (!dropdownActive) {
      setDropdownActive(true);
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
        <DropdownItem clickable={true}>Set status</DropdownItem>
        <DropdownItem clickable={true} onClickHandler={handleLogout}>
          Log out
        </DropdownItem>
      </Dropdown>
    </Container>
  );
};
