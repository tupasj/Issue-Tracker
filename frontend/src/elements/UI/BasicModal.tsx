import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { BasicSelect } from './BasicSelect';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#ffffff',
  boxShadow: 4,
};

type Props = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BasicModal = ({ modalOpen, setModalOpen }: Props) => {
  const [priority, setPriority] = useState('none');
  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <BasicSelect
          label="priority"
          items={['none', 'high', 'medium', 'low']}
          defaultState={priority}
          setState={setPriority}
        />
      </Box>
    </Modal>
  );
};
