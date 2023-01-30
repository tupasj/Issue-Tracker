import styled from 'styled-components';
import { useState } from 'react';
import { IssuesOptionsBar } from '@/components/Issues';
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
  issues: any[];
  getIssues: () => void;
  setIssues: React.Dispatch<React.SetStateAction<any>>;
};

export const IssuesContainer = ({ issues, getIssues, setIssues }: Props) => {
  const [openActive, setOpenActive] = useState(true);
  const [closedActive, setClosedActive] = useState(false);
  const openIssues = issues.filter((issue) => issue.is_open === true);
  const closedIssues = issues.filter((issue) => issue.is_open === false);
  let currentIssues: any;

  useEffect(() => {
    getIssues();
    console.log('issues: ', issues);
  }, []);

  if (openActive) {
    currentIssues = openIssues;
  } else {
    currentIssues = closedIssues;
  }

  return (
    <Container>
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
          />
        ))}
      </IssuesList>
    </Container>
  );
};
