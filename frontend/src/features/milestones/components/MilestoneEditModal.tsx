import styled from 'styled-components';
import { BasicModal } from '@/components/UI';

const Container = styled.div``;

type Props = {
  modalOpen: any;
  handleClose: () => void;
};

export const MilestoneEditModal = ({ modalOpen, handleClose }: Props) => {
  return (
    <BasicModal modalOpen={modalOpen} handleClose={handleClose}>
      <Container>
        <p>MilestoneEditModal</p>
      </Container>
    </BasicModal>
  );
};
