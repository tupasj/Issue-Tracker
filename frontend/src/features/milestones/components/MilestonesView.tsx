import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { issuesContext, projectsContext } from '@/context';
import { Button } from '@/elements';
import { IssueSwitch } from '@/features/issues';
import { getMilestones } from '../api';
import { MilestoneCards } from './MilestoneCards';
import { NoMilestonesFound } from './NoMilestonesFound';
import { MilestoneAddModal } from './MilestoneAddModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 6px;
  background-color: #f7faf9;
`;

const MilestonesContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
`;

const MilestonesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 22px;
  padding-right: 22px;
  padding-top: 14px;
  padding-bottom: 14px;
`;

type Props = {
  milestones: any[];
  setMilestones: React.Dispatch<React.SetStateAction<any>>;
};

export const MilestonesView = ({ milestones, setMilestones }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { issues } = issuesContext();
  const { currentProject } = projectsContext();

  const handleClick = async () => {
    // const newMilestone = await createMilestone(currentProject);
    // setMilestones([...milestones, newMilestone]);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchMilestones = async () => {
      const retrievedMilestones = await getMilestones(currentProject);
      setMilestones(retrievedMilestones);
    };

    fetchMilestones();
  }, []);

  return (
    <Container>
      <MilestonesHeader>
        <IssueSwitch issues={issues} />
        <Button onClick={handleClick}>Add Milestone</Button>
      </MilestonesHeader>
      <MilestonesContainer>
        {milestones[0] ? <MilestoneCards milestones={milestones} /> : <NoMilestonesFound />}
      </MilestonesContainer>
      <MilestoneAddModal
        modalOpen={modalOpen}
        handleClose={handleClose}
        milestones={milestones}
        setMilestones={setMilestones}
      />
    </Container>
  );
};
