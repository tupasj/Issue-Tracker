import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

type Props = {
  modalOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  styling?: any;
};

export const ResponsiveModal = ({ modalOpen, handleClose, children, styling }: Props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [modalWidth, setModalWidth] = useState(400);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: modalWidth,
    bgcolor: '#ffffff',
    boxShadow: 4,
    borderRadius: 2,
  };

  useEffect(() => {
    if (windowWidth <= 768 && modalWidth !== 355) {
      setModalWidth(355);
    } else if (windowWidth > 768 && modalWidth !== 400) {
      setModalWidth(400);
    }

    const handleResizeWindow = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, [windowWidth]);

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
