import styled from 'styled-components';
import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { issuesContext, projectsContext } from '@/context';
import { getMilestoneIssues } from '@/features/milestones';
import { getIssues } from '../api';
import { IssuesOptionsBar } from './IssuesOptionsBar';
import { IssueCard } from './IssueCard';
import { NoIssuesFound } from './NoIssuesFound';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 6px;
  background-color: #f7faf9;
`;

const IssuesList = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
`;

type Props = {
  milestones?: any[];
  milestoneId?: string;
};

export const IssuesView = ({ milestones, milestoneId }: Props) => {
  let { openStatus, milestonesOpenStatus, issuesOpenStatus }: any = useParams();
  let routeOpenStatus = openStatus;
  let location = useLocation();
  const { currentProject } = projectsContext();
  const { issues, setIssues } = issuesContext();

  useEffect(() => {
    if (milestones) {
      const milestoneIdInt = parseInt(milestoneId as string);
      const fetchMilestoneIssues = async () => {
        const milestoneIssues = await getMilestoneIssues(
          currentProject,
          milestoneIdInt,
          issuesOpenStatus
        );
        setIssues(milestoneIssues);
      };

      fetchMilestoneIssues();
    } else {
      const fetchIssues = async () => {
        const fetchedIssues = await getIssues(currentProject, openStatus);
        setIssues(fetchedIssues);
      };

      fetchIssues();
    }
  }, [location]);

  return (
    <Container>
      <IssuesOptionsBar
        issues={issues}
        setIssues={setIssues}
        milestoneId={milestoneId}
        milestonesOpenStatus={milestonesOpenStatus}
      />
      <IssuesList>
        {issues[0] ? (
          <>
            {issues.map((issue: any) => (
              <IssueCard
                key={issue.issue_number}
                title={issue.title}
                number={issue.issue_number}
                timePosted={issue.createdAt}
                priority={issue.priority}
                postedBy={issue.postedBy}
                routeOpenStatus={routeOpenStatus}
                labels={issue.labels}
                milestoneId={milestoneId}
                isOpen={issue.is_open}
              />
            ))}
          </>
        ) : (
          <NoIssuesFound />
        )}
      </IssuesList>
    </Container>
  );
};
