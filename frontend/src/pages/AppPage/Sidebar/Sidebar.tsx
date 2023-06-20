import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.aside`
  box-shadow: 1px 0px 1px 0px rgba(0, 0, 0, 0.15);
  width: 175px;
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 10px;
  margin-bottom: 18px;
  border-radius: 2px;
  text-decoration: none;
  color: var(--black);
  &:hover {
    background-color: #cecece;
  }
  z-index: 1;
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
        <StyledLink to="/app/milestones/open">Milestones</StyledLink>
        <StyledLink to="/app/people">People</StyledLink>
        <StyledLink to="/app/settings">Settings</StyledLink>
      </Links>
    </Container>
  );
};
