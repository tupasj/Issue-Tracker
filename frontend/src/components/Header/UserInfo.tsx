import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  position: absolute;
  right: 22px;
  display: flex;
  align-items: center;
`;

const ImgPlaceholder = styled.div`
  background-color: black;
  border-radius: 50%;
  align-self: center;
  height: 46px;
  width: 46px;
  margin-left: 10px;
  margin-right: 4px;
  cursor: pointer;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

export const UserInfo = () => {
  return (
    <Container>
      <p>username@email.com</p>
      <ImgPlaceholder />
      <StyledFontAwesomeIcon icon={faAngleDown} />
    </Container>
  );
};
