import styled from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { projectsContext } from '@/context';
import { getIssues } from '@/features/issues';
import { getMilestoneIssues } from '@/features/milestones';

const Container = styled.div`
  display: flex;
  border: 2px solid #f7faf9;
  border-radius: 4px;
`;

const SwitchLeft = styled.span<any>`
  background-color: ${(props) => (props.open === 'open' ? 'var(--light-gray)' : 'var(--white)')};
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right-width: 1px;
  padding: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
`;

const SwitchRight = styled.span<any>`
  background-color: ${(props) => (props.open === 'open' ? 'var(--white)' : 'var(--light-gray)')};
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-left-width: 1px;
  padding: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
`;

type Props = {
  issues: any;
  milestoneId?: string;
};

export const IssueSwitch = ({ issues, milestoneId }: Props) => {
  let { openStatus, milestonesOpenStatus, issuesOpenStatus }: any = useParams();
  const navigate = useNavigate();
  let location = useLocation();
  const [allIssues, setAllIssues] = useState<any[]>(issues);
  const { currentProject } = projectsContext();
  let open = milestoneId ? issuesOpenStatus : openStatus;

  const toggleSwitch = () => {
    if (milestoneId && issuesOpenStatus === 'open') {
      navigate(`/app/milestones/${milestonesOpenStatus}/${milestoneId}/issues/closed`);
    } else if (milestoneId && issuesOpenStatus === 'closed') {
      navigate(`/app/milestones/${milestonesOpenStatus}/${milestoneId}/issues/open`);
    } else if (openStatus === 'open') {
      navigate('/app/issues/closed');
    } else if (openStatus === 'closed') {
      navigate('/app/issues/open');
    }
  };

  useEffect(() => {
    const getAllIssues = async () => {
      const allIssues = await getIssues(currentProject);
      setAllIssues(allIssues);
    };
    const getAllMilestoneIssues = async () => {
      const milestoneIdInt = parseInt(milestoneId as string);
      const allMilestoneIssues = await getMilestoneIssues(currentProject, milestoneIdInt);
      setAllIssues(allMilestoneIssues);
    };

    if (milestoneId) {
      getAllMilestoneIssues();
    } else {
      getAllIssues();
    }
  }, [location]);

  return (
    <Container>
      <SwitchLeft open={open} onClick={toggleSwitch}>
        Open ({allIssues.filter((issue: any) => issue.is_open === true).length})
      </SwitchLeft>
      <SwitchRight open={open} onClick={toggleSwitch}>
        Closed ({allIssues.filter((issue: any) => issue.is_open === false).length})
      </SwitchRight>
    </Container>
  );
};
