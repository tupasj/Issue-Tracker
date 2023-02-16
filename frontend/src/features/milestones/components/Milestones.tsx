import styled from 'styled-components';
import { issuesContext } from '@/context';
import { Button } from '@/elements';
import { IssueSwitch } from '@/features/issues';
import { MilestoneCard } from './MilestoneCard';

const Container = styled.div`
  height: 100%;
  border-radius: 6px;
  background-color: #f7faf9;
`;

const MilestonesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
`;

const MilestonesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 22px;
  padding-right: 22px;
  padding-top: 14px;
  padding-bottom: 14px;
`;

export const Milestones = () => {
  const { issues } = issuesContext();

  return (
    <Container>
      <MilestonesHeader>
        <IssueSwitch issues={issues} />
        <Button>Add Milestone</Button>
      </MilestonesHeader>
      <MilestonesContainer>
        <MilestoneCard />
        <MilestoneCard />
      </MilestonesContainer>
    </Container>
  );
};
