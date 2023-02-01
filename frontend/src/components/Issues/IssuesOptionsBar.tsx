import styled from 'styled-components';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IssueSwitch, IssueSearchbar } from '@/elements/Issue';
import { AddIssueModal } from '@/elements/Issue';
import { Button } from '@/elements';

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
  getIssues: () => any;
  setIssues: React.Dispatch<React.SetStateAction<any>>;
  openActive: boolean;
  setOpenActive: React.Dispatch<React.SetStateAction<any>>;
};

export const IssuesOptionsBar = ({
  issues,
  setIssues,
  getIssues,
  openActive,
  setOpenActive,
}: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <IssueSwitch
        issues={issues}
        getIssues={getIssues}
        openActive={openActive}
        setOpenActive={setOpenActive}
      />
      <IssueSearchbar issues={issues} setIssues={setIssues} />
      <Button onClick={handleOpen}>
        Add Issue <StyledFontAwesomeIcon icon={faPlus} />
      </Button>
      <AddIssueModal issues={issues} open={open} handleClose={handleClose} setIssues={setIssues} />
    </Container>
  );
};
