import styled from 'styled-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentMilestone } from '@/utils/milestoneUtils';
import { IssuesView } from '@/features/issues';
import { Divider } from '@/elements';
import { MilestoneEditModal } from './MilestoneEditModal';
import { MilestoneDeleteModal } from './MilestoneDeleteModal';

const Container = styled.div`
  height: 100%;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
`;

const Description = styled.div``;

const Edit = styled.span`
  color: var(--light-blue);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Delete = styled.span`
  color: var(--red);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  max-width: 400px;
  word-wrap: break-word;
  line-height: 1.25;
`;

const ProgressbarContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  line-height: 1.25;
`;

type Props = {
  milestones: any[];
};

export const MilestoneView = ({ milestones }: Props) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  let { milestoneId } = useParams();
  const currentMilestone = getCurrentMilestone(milestones, milestoneId);

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  return (
    <Container>
      <TitleSection>
        <TitleWrapper>
          <Title>{currentMilestone.title}</Title>
          <Description>{currentMilestone.description}</Description>
        </TitleWrapper>
        <ProgressbarContainer>
          <div>Progress bar</div>
          <div>
            <Edit onClick={() => setEditModalOpen(true)}>Edit</Edit>{' '}
            <Delete onClick={() => setDeleteModalOpen(true)}>Delete</Delete>
          </div>
        </ProgressbarContainer>
      </TitleSection>
      <Divider />
      <IssuesView />
      <MilestoneEditModal modalOpen={editModalOpen} handleClose={handleEditModalClose} />
      <MilestoneDeleteModal modalOpen={deleteModalOpen} handleClose={handleDeleteModalClose} />
    </Container>
  );
};
