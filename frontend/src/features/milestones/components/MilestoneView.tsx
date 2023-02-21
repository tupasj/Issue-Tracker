import styled from 'styled-components';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentMilestone } from '@/utils/milestoneUtils';
import { projectsContext } from '@/context';
import { IssuesView } from '@/features/issues';
import { Divider } from '@/elements';
import { deleteMilestone } from '../api';
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
  setMilestones: React.Dispatch<React.SetStateAction<any>>;
};

export const MilestoneView = ({ milestones, setMilestones }: Props) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  let { milestoneId } = useParams();
  let navigate = useNavigate();
  const { currentProject } = projectsContext();
  const currentMilestone = getCurrentMilestone(milestones, milestoneId);

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDeleteModalClose = async () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteMilestone = async () => {
    const milestoneIdInt = parseInt(milestoneId as string);
    await deleteMilestone(currentProject, milestoneIdInt);
    navigate('/app/milestones/open');
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
      <MilestoneEditModal
        modalOpen={editModalOpen}
        handleClose={handleEditModalClose}
        milestones={milestones}
        setMilestones={setMilestones}
      />
      <MilestoneDeleteModal
        modalOpen={deleteModalOpen}
        handleClose={handleDeleteModalClose}
        handleDelete={handleDeleteMilestone}
      />
    </Container>
  );
};
