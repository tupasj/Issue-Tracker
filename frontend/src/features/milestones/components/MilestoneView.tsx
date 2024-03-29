import styled from 'styled-components';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentMilestone } from '@/utils/milestoneUtils';
import { projectsContext, userContext } from '@/context';
import { useMilestoneIssues } from '@/hooks';
import { IssuesView } from '@/features/issues';
import { Divider } from '@/elements';
import { deleteMilestone } from '../api';
import { MilestoneEditModal } from './MilestoneEditModal';
import { MilestoneDeleteModal } from './MilestoneDeleteModal';
import { MilestoneProgressBar } from './MilestoneProgressBar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  gap: 6px;
  width: 250px;
  line-height: 1.25;
`;

type Props = {
  milestones: any[];
  setMilestones: React.Dispatch<React.SetStateAction<any>>;
};

export const MilestoneView = ({ milestones, setMilestones }: Props) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteNotification, setDeleteNotification] = useState('');
  let { milestoneId } = useParams();
  let navigate = useNavigate();
  const { currentProject } = projectsContext();
  const { type } = userContext();
  const currentMilestone = getCurrentMilestone(milestones, milestoneId);
  const id = parseInt(milestoneId as string);
  const allMilestoneIssues = useMilestoneIssues(currentProject, id);
  const closedMilestoneIssues = useMilestoneIssues(currentProject, id, 'closed');
  const completionPercentage =
    (closedMilestoneIssues.milestoneIssues.length / allMilestoneIssues.milestoneIssues.length) *
    100;

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDeleteModalClose = async () => {
    setDeleteModalOpen(false);
    setDeleteNotification('');
  };

  const handleDeleteMilestone = async () => {
    // Prevent deletion of demo project items
    if (currentProject.code !== 'r0A3xG3i') {
      const milestoneIdInt = parseInt(milestoneId as string);
      const response: any = await deleteMilestone(currentProject, milestoneIdInt);
      if (response.status === 200) {
        navigate('/app/milestones/open');
      }
    } else {
      setDeleteNotification(`Can't delete demo project items. Make a new project to test
      out all the features!`);
    }
  };

  return (
    <Container>
      <TitleSection>
        <TitleWrapper>
          <Title>{currentMilestone.title}</Title>
          <Description>{currentMilestone.description}</Description>
        </TitleWrapper>
        <ProgressbarContainer>
          <MilestoneProgressBar percentage={completionPercentage} />
          {type === 'admin' && (
            <div>
              <Edit onClick={() => setEditModalOpen(true)}>Edit</Edit>{' '}
              <Delete onClick={() => setDeleteModalOpen(true)}>Delete</Delete>
            </div>
          )}
        </ProgressbarContainer>
      </TitleSection>
      <Divider />
      <IssuesView milestones={milestones} milestoneId={milestoneId} />
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
        deleteNotification={deleteNotification}
      />
    </Container>
  );
};
