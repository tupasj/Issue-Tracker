import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignsPost } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { projectsContext } from '@/context';
import { useMilestoneIssues } from '@/hooks';
import { MilestoneProgressBar } from './MilestoneProgressBar';

const Container = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  padding: 28px;
  border-radius: 4px;
  background-color: var(--white);
  cursor: pointer;
  &:hover {
    background-color: var(--extra-light-gray);
  }
`;

const Title = styled.div`
  font-weight: 600;
  line-height: 1.5;
  cursor: pointer;
  &:hover {
    color: var(--blue);
  }
`;

const IssueInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 254px;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 254px;
`;

type Props = {
  id: number;
  title: string;
  isOpen: boolean;
};

export const MilestoneCard = ({ id, title }: Props) => {
  const navigate = useNavigate();
  const { currentProject } = projectsContext();
  const allMilestoneIssues = useMilestoneIssues(currentProject, id);
  const openMilestoneIssues = useMilestoneIssues(currentProject, id, 'open');
  const closedMilestoneIssues = useMilestoneIssues(currentProject, id, 'closed');
  let { milestonesOpenStatus } = useParams();
  const loading =
    allMilestoneIssues.isLoading &&
    openMilestoneIssues.isLoading &&
    closedMilestoneIssues.isLoading;
  const noIssues = !allMilestoneIssues.isLoading && allMilestoneIssues.milestoneIssues.length === 0;

  const getCompletionPercentage = (noIssues: boolean) => {
    if (noIssues) {
      return 0;
    } else {
      return (
        (closedMilestoneIssues.milestoneIssues.length / allMilestoneIssues.milestoneIssues.length) *
        100
      );
    }
  };

  return (
    <Container
      onClick={() => navigate(`/app/milestones/${milestonesOpenStatus}/${id}/issues/open`)}
    >
      <Title>
        <FontAwesomeIcon icon={faSignsPost} /> {title}
      </Title>
      <ProgressBarContainer>
        {!loading && !noIssues && (
          <MilestoneProgressBar percentage={getCompletionPercentage(noIssues)} />
        )}
        <IssueInfo>
          {!loading && !noIssues && (
            <>
              <div>{getCompletionPercentage(noIssues)}% complete</div>
              <div>{openMilestoneIssues.milestoneIssues.length} open</div>
              <div>{closedMilestoneIssues.milestoneIssues.length} closed</div>
            </>
          )}
        </IssueInfo>
      </ProgressBarContainer>
    </Container>
  );
};
