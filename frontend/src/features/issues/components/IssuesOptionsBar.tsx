import styled from 'styled-components';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/elements';
import { IssueAddModal } from './IssueAddModal';
import { IssueSwitch } from './IssueSwitch';
import { IssueSearchbar } from './IssueSearchbar';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 22px;
  padding-right: 22px;
  padding-top: 14px;
  padding-bottom: 14px;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  padding-left: 4px;
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
      <IssueSwitch issues={issues} />
      <IssueSearchbar issues={issues} setIssues={setIssues} />
      <Button onClick={handleOpen}>
        Add Issue <StyledFontAwesomeIcon icon={faPlus} />
      </Button>
      <IssueAddModal issues={issues} open={open} handleClose={handleClose} setIssues={setIssues} />
    </Container>
  );
};
