import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  position: relative;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const UserInfoDropdown = styled.div`
  background-color: #f7faf9;
  position: absolute;
  right: -4px;
  padding: 8px;
  border-radius: 8px;
  top: 34px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.5);
`;

const Divider = styled.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.5);
  margin-top: 4px;
  margin-bottom: 4px;
`;

const DropDownItemContainer = styled.div<DropDownItemProps>`
  white-space: nowrap;
  padding-top: 4px;
  padding-bottom: 4px;
  cursor: ${(props) => (props.clickable ? 'pointer' : 'text')};
  &:hover {
    text-decoration: ${(props) => (props.clickable ? 'underline' : 'none')};
  }
`;

type DropDownItemProps = {
  children: React.ReactNode;
  clickable: boolean;
  onClickHandler?: () => void;
};

const DropDownItem = ({ children, clickable, onClickHandler }: DropDownItemProps) => {
  return (
    <DropDownItemContainer clickable={clickable} onClick={onClickHandler}>
      {children}
    </DropDownItemContainer>
  );
};

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

  const logout = () => {
    try {
      axiosInstance.delete('/user/logout');
      navigate('/sign-in');
    } catch (error: any) {
      axiosErrorHandler(error);
    }
  };

  return (
    <Container onClick={toggleDropdown}>
      <StyledFontAwesomeIcon icon={faAngleDown} />
      {dropdownActive && (
        <UserInfoDropdown>
          <DropDownItem clickable={false}>Regular user</DropDownItem>
          <Divider />
          <DropDownItem clickable={true}>Set status</DropDownItem>
          <DropDownItem clickable={true} onClickHandler={logout}>
            Log out
          </DropDownItem>
        </UserInfoDropdown>
      )}
    </Container>
  );
};
