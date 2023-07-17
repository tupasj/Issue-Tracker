import styled from 'styled-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { projectsContext } from '@/context';
import { ResponsiveModal } from '@/components/UI';
import { Button } from '@/elements';
import { getCurrentMilestone, makeUpdatedMilestones } from '@/utils/milestoneUtils';
import { updateMilestone } from '../api';

const Container = styled.div`
  height: 275px;
  padding: 12px;
`;

const H2 = styled.h2`
  padding-top: 4px;
  padding-bottom: 18px;
  font-weight: 600;
`;

const H3 = styled.h3`
  padding-bottom: 8px;
`;

const TextInput = styled.input`
  padding-left: 6px;
  padding-right: 6px;
  margin-bottom: 12px;
  border: 1px solid var(--medium-gray);
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 0;
  margin-bottom: 18px;
  border-radius: 4px;
  height: 100px;
  width: 100%;
  border: 1px solid var(--medium-gray);
  resize: none;
`;

type Props = {
  modalOpen: any;
  handleClose: () => void;
  milestones: any[];
  setMilestones: React.Dispatch<React.SetStateAction<any>>;
};

export const MilestoneEditModal = ({
  modalOpen,
  handleClose,
  milestones,
  setMilestones,
}: Props) => {
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  let { milestoneId } = useParams();
  const { currentProject } = projectsContext();
  const currentMilestone = getCurrentMilestone(milestones, milestoneId);

  const handleClick = async () => {
    const payload = { title: titleInput, description: descriptionInput };
    const milestoneIdInt = parseInt(milestoneId as string);
    const updatedMilestone = await updateMilestone(currentProject, milestoneIdInt, payload);
    const updatedMilestones = makeUpdatedMilestones(milestones, updatedMilestone);
    setMilestones(updatedMilestones);
    setTitleInput('');
    setDescriptionInput('');
  };

  return (
    <ResponsiveModal modalOpen={modalOpen} handleClose={handleClose}>
      <Container>
        <H2>Edit Milestone</H2>
        <H3>Title</H3>
        <TextInput
          type="text"
          minLength={1}
          maxLength={100}
          onChange={(e) => setTitleInput(e.target.value)}
          defaultValue={currentMilestone.title}
        />
        <H3>Description</H3>
        <TextArea
          minLength={1}
          maxLength={255}
          onChange={(e) => setDescriptionInput(e.target.value)}
          defaultValue={currentMilestone.description}
        />
        <Button right onClick={handleClick}>
          Save changes
        </Button>
      </Container>
    </ResponsiveModal>
  );
};
