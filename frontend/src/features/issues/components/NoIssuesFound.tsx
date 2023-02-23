import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 15%;
  height: 100%;
  font-size: 1.25rem;
`;

export const NoIssuesFound = () => {
  return (
    <Container>
      <FontAwesomeIcon icon={faFolderOpen} />
      <div>No Issues found.</div>
    </Container>
  );
};
