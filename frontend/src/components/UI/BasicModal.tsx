import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

type Props = {
  modalOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  styling?: any;
};

export const BasicModal = ({ modalOpen, handleClose, children, styling }: Props) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#ffffff',
    boxShadow: 4,
    borderRadius: 2,
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styling ? styling : style}>{children}</Box>
    </Modal>
  );
};
