import { useState } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#ffffff',
  boxShadow: 4,
};

const Container = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px;
  background-color: #f7faf9;
  @media (max-width: 410px) {
    flex-wrap: wrap;
  }
`;

const IssueInfo = styled.div``;

const IssueOptions = styled.div``;

const IssueTitle = styled.input`
  padding: 4px;
  margin-bottom: 4px;
  width: 95%;
`;

const IssueTextarea = styled.textarea`
  padding: 4px;
  margin-bottom: 8px;
  height: 180px;
  width: 95%;
  resize: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 4px;
  justify-content: flex-end;
  padding-right: 4px;
`;

type Props = {
  open: any;
  handleClose: () => void;
};

export const AddIssueModal = ({ open, handleClose }: Props) => {
  const [title, setTitle] = useState<string | null>('');
  const [description, setDescription] = useState<string | null>('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('title: ', title);
    console.log('description: ', description);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container>
            <IssueInfo>
              <IssueTitle
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <IssueTextarea
                id="description"
                name="description"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <ButtonContainer>
                <button>Upload image</button>
                <button onClick={handleSubmit}>Submit Issue</button>
              </ButtonContainer>
            </IssueInfo>
            <IssueOptions>
              <div>Assignees</div>
              <div>...</div>
              <div>Labels</div>
              <div>...</div>
              <div>Milestone</div>
              <div>...</div>
            </IssueOptions>
          </Container>
        </Box>
      </Modal>
    </>
  );
};
