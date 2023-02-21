import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { projectsContext } from '@/context';
import { Button } from '@/elements';
import { getMilestones } from '../api';
import { MilestoneCards } from './MilestoneCards';
import { NoMilestonesFound } from './NoMilestonesFound';
import { MilestoneAddModal } from './MilestoneAddModal';
import { MilestoneSwitch } from './MilestonesSwitch';

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
  let { milestonesOpenStatus }: any = useParams();
  let location = useLocation();
  const { currentProject } = projectsContext();

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    console.log('milestonesView milestonesOpenStatus', milestonesOpenStatus);
    const fetchMilestones = async () => {
      const retrievedMilestones = await getMilestones(currentProject, milestonesOpenStatus);
      setMilestones(retrievedMilestones);
    };

    fetchMilestones();
  }, [location]);

  return (
    <Container>
      <MilestonesHeader>
        <MilestoneSwitch milestones={milestones} />
        <Button onClick={() => setModalOpen(true)}>Add Milestone</Button>
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
