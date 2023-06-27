import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.aside`
  flex: 0 0 auto;
  width: 175px;
  box-shadow: 1px 0px 1px 0px rgba(0, 0, 0, 0.15);
  @media (max-width: 768px) {
    width: auto;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 10px;
  border-radius: 2px;
  text-decoration: none;
  color: var(--black);
  z-index: 1;
  &:hover {
    background-color: #cecece;
  }
  @media (min-width: 768px) {
    margin-bottom: 18px;
  }
`;

const Links = styled.div`
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    height: auto;
    padding: 8px;
    box-shadow: 1px 0px 1px 0px rgba(0, 0, 0, 0.15);
  }
  @media (min-width: 768px) {
    padding: 12px;
    padding-top: 50px;
    height: 250px;
  }
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
