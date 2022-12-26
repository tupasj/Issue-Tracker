import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { HeaderDropdown } from '@/components/Header';

const Container = styled.header`
  grid-area: header;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.15);
`;

const StyledLink = styled(Link)`
  position: absolute;
  left: 18px;
  &:link,
  :visited,
  :active {
    color: black;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 32px;
  cursor: pointer;
`;

export const sum = (...numbers: number[]) => {
  return numbers.reduce((total, number) => total + number, 0);
};

export const Header = () => {
  return (
    <Container>
      <StyledLink to="/app/dashboard">
        <StyledFontAwesomeIcon icon={faBinoculars} />
      </StyledLink>
      <HeaderDropdown />
    </Container>
  );
};
