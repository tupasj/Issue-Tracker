import styled from 'styled-components';
import { BasicModal } from '@/components/UI';
import { Button } from '@/elements';

const Container = styled.div`
  padding: 12px;
  line-height: 1.25;
  text-align: center;
`;

const Text = styled.div`
  padding-bottom: 8px;
`;

type Props = {
  modalOpen: any;
  handleClose: () => void;
  handleDelete: () => void;
};

export const MilestoneDeleteModal = ({ modalOpen, handleClose, handleDelete }: Props) => {
  return (
    <BasicModal modalOpen={modalOpen} handleClose={handleClose}>
      <Container>
        <Text>
          Are you sure you want to delete this Milestone? Note that only the Milestone will be
          deleted. The associated Issues will still remain.
        </Text>
        <Button color="var(--red)" hoverColor="var(--dark-red)" onClick={handleDelete}>
          Delete Milestone
        </Button>
      </Container>
    </BasicModal>
  );
};
