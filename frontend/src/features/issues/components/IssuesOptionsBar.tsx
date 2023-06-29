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

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const FlexVertical = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 640px) {
    justify-content: start;
  }
`;

type Props = {
  issues: any[];
  setIssues: React.Dispatch<React.SetStateAction<any>>;
  milestoneId?: string;
  milestonesOpenStatus?: any;
};

export const IssuesOptionsBar = ({ issues, setIssues, milestoneId }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <FlexVertical>
        <SearchBarWrapper>
          <IssueSearchbar issues={issues} setIssues={setIssues} />
        </SearchBarWrapper>
        <Flex>
          <IssueSwitch issues={issues} milestoneId={milestoneId} />
          {!milestoneId && (
            <Button onClick={handleOpen}>
              Add Issue <StyledFontAwesomeIcon icon={faPlus} />
            </Button>
          )}
        </Flex>
      </FlexVertical>
      <IssueAddModal issues={issues} open={open} handleClose={handleClose} setIssues={setIssues} />
    </Container>
  );
};
