import styled from 'styled-components';
import { Issue } from '@/components/Elements';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
`;

export const IssuesList = () => {
  return (
    <Container>
      <Issue />
      <Issue />
      <Issue />
      <Issue />
    </Container>
  );
};
