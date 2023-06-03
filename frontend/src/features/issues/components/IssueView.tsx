import styled from 'styled-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { issuesContext } from '@/context';
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

export const IssueView = () => {
  let { issueNumber } = useParams();
  const { issues, setIssues } = issuesContext();
  const currentIssue = getCurrentIssue(issues, issueNumber);
  const [headerInfo, setHeaderInfo] = useState({
    title: currentIssue.title,
    priority: currentIssue.priority,
  });

  return (
    <Container>
      <IssueViewHeader
        issues={issues}
        setIssues={setIssues}
        currentIssue={currentIssue}
        headerInfo={headerInfo}
        setHeaderInfo={setHeaderInfo}
      />
      <Divider />
      <CommentsAndOptionsFlexContainer>
        <IssueViewMain
          issues={issues}
          setIssues={setIssues}
          currentIssue={currentIssue}
          headerInfo={headerInfo}
          setHeaderInfo={setHeaderInfo}
        />
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
