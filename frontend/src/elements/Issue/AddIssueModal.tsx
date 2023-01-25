import { useState, useContext } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { UserContext, ProjectsContext } from '@/context';
import { BasicSelect } from '@/elements/UI';

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
  issues: any[];
  setIssues: React.Dispatch<React.SetStateAction<any>>;
};

export const AddIssueModal = ({ open, handleClose, issues, setIssues }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('none');
  const userCtx = useContext(UserContext);
  const email = userCtx?.email;
  const { currentProject } = useContext(ProjectsContext) as any;

  const createNewIssue = async (e: any) => {
    e.preventDefault();
    try {
      const newIssueInfo = {
        code: currentProject.code,
        poster_email: email,
        title,
        description,
        priority,
      };
      console.log('newIssueInfo: ', newIssueInfo);
      const newIssue = await axiosInstance.post('/projects/issues', newIssueInfo);
      console.log('newIssue: ', newIssue.data);
      setIssues([...issues, newIssue.data]);
    } catch (error: any) {
      axiosErrorHandler(error);
    }
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
                <button onClick={createNewIssue}>Submit Issue</button>
              </ButtonContainer>
            </IssueInfo>
            <IssueOptions>
              <div>Assignees</div>
              <div>...</div>
              <div>Priority</div>
              <BasicSelect
                priority={priority}
                setPriority={setPriority}
                items={['high', 'medium', 'low', 'none']}
              />
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
