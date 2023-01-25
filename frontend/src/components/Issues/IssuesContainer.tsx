import styled from 'styled-components';
import { IssuesOptionsBar } from '@/components/Issues';
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
  issues: any[];
  setIssues: React.Dispatch<React.SetStateAction<any>>;
};

export const IssuesContainer = ({ issues, setIssues }: Props) => {
  return (
    <Container>
      <IssuesOptionsBar issues={issues} setIssues={setIssues} />
      <IssuesList>
        {issues.map((issue) => (
          <IssueCard
            key={issue.issue_number}
            title={issue.title}
            description={issue.description}
            number={issue.issue_number}
            timePosted={issue.createdAt}
            postedBy={issue.posted_by}
            isOpen={issue.is_open}
            priority={issue.priority}
          />
        ))}
      </IssuesList>
    </Container>
  );
};
