import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  border: 2px solid #f7faf9;
  border-radius: 4px;
`;

const SwitchLeft = styled.span`
  background-color: #e6e6e6;
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right-width: 1px;
  padding: 4px;
  font-size: 0.75rem;
  cursor: pointer;
`;

const SwitchRight = styled.span`
  background-color: #fff;
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-left-width: 1px;
  padding: 4px;
  font-size: 0.75rem;
  cursor: pointer;
`;

export const IssueSwitch = () => {
  return (
    <Container>
      <SwitchLeft>Open (18)</SwitchLeft>
      <SwitchRight>Closed (4)</SwitchRight>
    </Container>
  );
};
