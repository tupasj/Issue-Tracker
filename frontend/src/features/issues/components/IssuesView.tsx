import styled from 'styled-components';
import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { projectsContext } from '@/context';
import { getIssues } from '@/features/issues';
import { IssuesOptionsBar } from './IssuesOptionsBar';
import { IssueCard } from './IssueCard';

const Container = styled.div`
  height: 100%;
  border-radius: 6px;
  background-color: #f7faf9;
`;

const IssuesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
`;

type Props = {
  issues: any;
  setIssues: React.Dispatch<React.SetStateAction<any>>;
};

export const IssuesView = ({ issues, setIssues }: Props) => {
  let { openStatus }: any = useParams();
  let routeOpenStatus = openStatus;
  let location = useLocation();
  const { currentProject } = projectsContext();

  useEffect(() => {
    const filterIssues = async () => {
      if (openStatus == 'open') {
        const allIssues = await getIssues(currentProject);
        let openIssues = allIssues.filter((issue: any) => issue.is_open === true);
        openIssues = openIssues.sort((a: any, b: any) => b.issue_number - a.issue_number);
        setIssues(openIssues);
      } else {
        const allIssues = await getIssues(currentProject);
        let closedIssues = allIssues.filter((issue: any) => issue.is_open === false);
        closedIssues = closedIssues.sort((a: any, b: any) => b.issue_number - a.issue_number);
        setIssues(closedIssues);
      }
    };

    filterIssues();
  }, [location]);

  return (
    <Container>
      <IssuesOptionsBar issues={issues} setIssues={setIssues} />
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
              />
            ))}
          </>
        ) : (
          <p>No issues</p>
        )}
      </IssuesList>
    </Container>
  );
};
