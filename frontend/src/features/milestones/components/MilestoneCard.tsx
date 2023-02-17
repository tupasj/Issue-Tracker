import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignsPost } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  padding: 28px;
  border-radius: 4px;
  background-color: var(--white);
  cursor: pointer;
  &:hover {
    background-color: var(--extra-light-gray);
  }
`;

const Title = styled.div`
  font-weight: 600;
  line-height: 1.5;
  cursor: pointer;
  &:hover {
    color: var(--blue);
  }
`;

const IssueInfo = styled.div`
  display: flex;
  gap: 12px;
`;

const ProgressBarContainer = styled.div``;

type Props = {
  id: number;
  title: string;
  isOpen: boolean;
};

export const MilestoneCard = ({ id, title }: Props) => {
  const navigate = useNavigate();

  // onClick={() => navigate('/app/milestones/')}
  return (
    <Container>
      <Title>
        <FontAwesomeIcon icon={faSignsPost} /> {title}
      </Title>
      <ProgressBarContainer>
        <div>Progress Bar</div>
        <IssueInfo>
          <div>0% complete</div>
          <div>5 open</div>
          <div>0 closed</div>
        </IssueInfo>
      </ProgressBarContainer>
    </Container>
  );
};
