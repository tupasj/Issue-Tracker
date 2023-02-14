import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getCurrentIssue } from '@/utils/issueUtils';
import { IssueOptions } from './IssueOptions';
import { IssueViewHeader } from './IssueViewHeader';
import { IssueViewMain } from './IssueViewMain';

const Container = styled.div``;

const Divider = styled.div`
  height: 1px;
  background-color: var(--light-gray);
  margin-top: 14px;
  margin-bottom: 14px;
`;

const CommentsAndOptionsFlexContainer = styled.div`
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
`;

const OptionsWrapper = styled.div`
  width: 200px;
`;

type Props = {
  issues: any[];
  setIssues: React.Dispatch<React.SetStateAction<any>>;
};

export const IssueView = ({ issues, setIssues }: Props) => {
  let { issueNumber } = useParams();
  const currentIssue = getCurrentIssue(issues, issueNumber);

  return (
    <Container>
      <IssueViewHeader issues={issues} setIssues={setIssues} currentIssue={currentIssue} />
      <Divider />
      <CommentsAndOptionsFlexContainer>
        <IssueViewMain issues={issues} setIssues={setIssues} currentIssue={currentIssue} />
        <OptionsWrapper>
          <IssueOptions
            labels={currentIssue.labels}
            issueNumber={currentIssue.issue_number}
            issues={issues}
            setIssues={setIssues}
          />
        </OptionsWrapper>
      </CommentsAndOptionsFlexContainer>
    </Container>
  );
};
