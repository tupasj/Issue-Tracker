import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  border: 2px solid #f7faf9;
  border-radius: 4px;
`;

const SwitchLeft = styled.span<any>`
  background-color: ${(props) => (props.openActive ? 'var(--light-gray)' : 'var(--white)')};
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right-width: 1px;
  padding: 4px;
  font-size: 0.75rem;
  cursor: pointer;
`;

const SwitchRight = styled.span<any>`
  background-color: ${(props) => (props.closedActive ? 'var(--light-gray)' : 'var(--white)')};
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-left-width: 1px;
  padding: 4px;
  font-size: 0.75rem;
  cursor: pointer;
`;

type Props = {
  openIssues: any[];
  closedIssues: any[];
  openActive: boolean;
  closedActive: boolean;
  setOpenActive: React.Dispatch<React.SetStateAction<any>>;
  setClosedActive: React.Dispatch<React.SetStateAction<any>>;
};

export const IssueSwitch = ({
  openIssues,
  closedIssues,
  openActive,
  closedActive,
  setOpenActive,
  setClosedActive,
}: Props) => {
  const toggleSwitch = () => {
    if (openActive) {
      setOpenActive(false);
      setClosedActive(true);
    } else if (closedActive) {
      setOpenActive(true);
      setClosedActive(false);
    }
  };

  return (
    <Container>
      <SwitchLeft openActive={openActive} onClick={toggleSwitch}>
        Open ({openIssues.length})
      </SwitchLeft>
      <SwitchRight closedActive={closedActive} onClick={toggleSwitch}>
        Closed ({closedIssues.length})
      </SwitchRight>
    </Container>
  );
};
