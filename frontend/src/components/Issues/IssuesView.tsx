import styled from 'styled-components';
import { useParams, useLocation } from 'react-router-dom';
import { IssuesOptionsBar } from './IssuesOptionsBar';
import { IssueCard } from '@/elements/Issue';
import { useEffect } from 'react';

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
  getIssues: () => any;
  openActive: boolean;
  setOpenActive: React.Dispatch<React.SetStateAction<any>>;
};

export const IssuesView = ({ issues, setIssues, getIssues, openActive, setOpenActive }: Props) => {
  let { openStatus }: any = useParams();
  let routeOpenStatus = openStatus;
  let location = useLocation();

  useEffect(() => {
    const filterIssues = async () => {
      if (openStatus == 'open') {
        const allIssues = await getIssues();
        const openIssues = allIssues.filter((issue: any) => issue.is_open === true);
        setIssues(openIssues);
      } else {
        const allIssues = await getIssues();
        const closedIssues = allIssues.filter((issue: any) => issue.is_open === false);
        setIssues(closedIssues);
      }
    };

    filterIssues();
  }, [location]);

  useEffect(() => {
    console.log('issues: ', issues);
  }, [issues]);

  return (
    <Container>
      <IssuesOptionsBar
        issues={issues}
        setIssues={setIssues}
        getIssues={getIssues}
        openActive={openActive}
        setOpenActive={setOpenActive}
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
