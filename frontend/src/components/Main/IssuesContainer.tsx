import styled from 'styled-components';
import { IssuesOptionsBar, IssuesList } from '@/components/Main';

const Container = styled.div`
  height: 100%;
  border-radius: 6px;
  background-color: #f7faf9;
`;

export const IssuesContainer = () => {
  return (
    <Container>
      <IssuesOptionsBar />
      <IssuesList />
    </Container>
  );
};
