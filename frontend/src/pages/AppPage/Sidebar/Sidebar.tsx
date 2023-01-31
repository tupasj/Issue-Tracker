import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.aside`
  grid-area: sidebar;
  box-shadow: 1px 0px 1px 0px rgba(0, 0, 0, 0.15);
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 10px;
  margin-bottom: 18px;
  border-radius: 2px;
  text-decoration: none;
  color: black;
  &:hover {
    background-color: #cecece;
  }
`;

const Links = styled.div`
  height: 250px;
  padding: 12px;
  padding-top: 50px;
`;

export const Sidebar = () => {
  return (
    <Container>
      <Links>
        <StyledLink to="/app/dashboard">Dashboard</StyledLink>
        <StyledLink to="/app/issues/open">Issues</StyledLink>
        <StyledLink to="/app/milestones">Milestones</StyledLink>
        <StyledLink to="/app/people">People</StyledLink>
        <StyledLink to="/app/settings">Settings</StyledLink>
      </Links>
    </Container>
  );
};
