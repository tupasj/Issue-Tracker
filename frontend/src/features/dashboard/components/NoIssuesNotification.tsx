import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/elements';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  gap: 12px;
`;

const PrimaryText = styled.div`
  font-weight: 600;
`;

export const NoIssuesNotification = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/app/issues/open');
  };

  return (
    <Container>
      <PrimaryText>There are currently no Issues for this Project.</PrimaryText>
      <Button onClick={handleClick}>
        Add a new Issue <FontAwesomeIcon icon={faRightToBracket} />
      </Button>
    </Container>
  );
};
