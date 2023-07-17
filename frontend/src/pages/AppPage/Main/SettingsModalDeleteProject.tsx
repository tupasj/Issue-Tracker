import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { projectsContext } from '@/context';
import { ResponsiveModal } from '@/components';
import { Button } from '@/elements';
import { deleteProject } from '@/features/projects';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 14px;
  border-radius: 4px;
  background-color: var(--white);
  text-align: center;
  &:hover {
    background-color: var(--extra-light-gray);
  }
`;

const Heading = styled.span`
  padding-top: 8px;
  padding-bottom: 4px;
  font-weight: 600;
`;

const NormalText = styled.div`
  margin-bottom: 14px;
`;

const Bold = styled.span`
  font-weight: 600;
`;

const Notification = styled.div`
  padding-top: 6px;
  font-style: italic;
`;

type Props = {
  open: boolean;
  handleClose: () => void;
  deleteNotification: string;
  setDeleteNotification: React.Dispatch<React.SetStateAction<string>>;
};

export const SettingsModalDeleteProject = ({
  open,
  handleClose,
  deleteNotification,
  setDeleteNotification,
}: Props) => {
  const { currentProject } = projectsContext();
  const navigate = useNavigate();

  const handleDelete = async () => {
    // Prevent deletion of demo project items
    if (currentProject.code !== 'r0A3xG3i') {
      await deleteProject(currentProject.code);
      navigate('/sign-in');
    } else {
      setDeleteNotification(`Can't delete demo project items. Make a new project to test
          out all the features!`);
    }
  };

  return (
    <ResponsiveModal modalOpen={open} handleClose={handleClose}>
      <Container>
        <Heading>Delete project</Heading>
        <NormalText>
          Are you sure you want to delete this project? This action cannot be undone.
        </NormalText>
        <Button color="var(--red)" hoverColor="var(--dark-red)" onClick={handleDelete}>
          Delete project
        </Button>
        <Notification>{deleteNotification}</Notification>
      </Container>
    </ResponsiveModal>
  );
};
