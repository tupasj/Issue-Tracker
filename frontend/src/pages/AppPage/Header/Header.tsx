import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { UserInfo } from '@/pages/AppPage/Header';
import { ProjectsDropdown } from '@/features/projects';

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.15);
  padding: 12px;
  z-index: 2;
  @media (max-width: 640px) {
    background-color: orange;
  }
`;

const StyledLink = styled(Link)`
  left: 22px;
  &:link,
  :visited,
  :active {
    color: var(--dark-purple);
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 32px;
  cursor: pointer;
`;

export const Header = () => {
  return (
    <Container>
      <StyledLink to="/app/dashboard">
        <StyledFontAwesomeIcon icon={faBinoculars} />
      </StyledLink>
      <ProjectsDropdown />
      <UserInfo />
    </Container>
  );
};
