import styled from 'styled-components';
import { IssueSwitch, IssueSearchbar } from '@/components/Elements/Issue';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 22px;
  padding-right: 22px;
  padding-top: 14px;
  padding-bottom: 14px;
`;

const AddIssueButton = styled.button`
  color: white;
  background-color: black;
  border-radius: 4px;
  cursor: pointer;
`;

export const IssuesOptionsBar = () => {
  return (
    <Container>
      <IssueSwitch />
      <IssueSearchbar />
      <AddIssueButton>Add Issue</AddIssueButton>
    </Container>
  );
};
