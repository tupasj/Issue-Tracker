import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { IssuesOptionsBar } from './IssuesOptionsBar';
import { IssueCard } from '@/elements/Issue';

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
  openActive: boolean;
  closedActive: boolean;
  setOpenActive: React.Dispatch<React.SetStateAction<any>>;
  setClosedActive: React.Dispatch<React.SetStateAction<any>>;
};

export const IssuesView = ({
  issues,
  setIssues,
  openActive,
  closedActive,
  setOpenActive,
  setClosedActive,
}: Props) => {
  let { openStatus }: any = useParams();
  const openIssues = issues.filter((issue: any) => issue.is_open === true);
  const closedIssues = issues.filter((issue: any) => issue.is_open === false);
  let currentIssues: any;
  let routeOpenStatus: any;

  if (openActive) {
    currentIssues = openIssues;
    routeOpenStatus = 'open';
  } else {
    currentIssues = closedIssues;
    routeOpenStatus = 'closed';
  }

  return (
    <Container>
      <p>IssuesView.. openStatus: {openStatus}</p>
      <IssuesOptionsBar
        issues={issues}
        setIssues={setIssues}
        openIssues={openIssues}
        closedIssues={closedIssues}
        openActive={openActive}
        closedActive={closedActive}
        setOpenActive={setOpenActive}
        setClosedActive={setClosedActive}
      />
      <IssuesList>
        {currentIssues.map((issue: any) => (
          <IssueCard
            key={issue.issue_number}
            title={issue.title}
            number={issue.issue_number}
            timePosted={issue.createdAt}
            priority={issue.priority}
            postedBy={issue.postedBy}
            routeOpenStatus={routeOpenStatus}
          />
        ))}
      </IssuesList>
    </Container>
  );
};
