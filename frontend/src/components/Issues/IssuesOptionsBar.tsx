import styled from 'styled-components';
import { useState } from 'react';
import { IssueSwitch, IssueSearchbar } from '@/elements/Issue';
import { AddIssueModal } from '@/elements/Issue';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 22px;
  padding-right: 22px;
  padding-top: 14px;
  padding-bottom: 14px;
`;

const AddIssueButton = styled.button`
  color: white;
  background-color: black;
  border-radius: 4px;
  cursor: pointer;
`;

type Props = {
  issues: any[];
  setIssues: React.Dispatch<React.SetStateAction<any>>;
};

export const IssuesOptionsBar = ({ issues, setIssues }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <IssueSwitch />
      <IssueSearchbar />
      <AddIssueButton onClick={handleOpen}>Add Issue</AddIssueButton>
      <AddIssueModal issues={issues} open={open} handleClose={handleClose} setIssues={setIssues} />
    </Container>
  );
};
