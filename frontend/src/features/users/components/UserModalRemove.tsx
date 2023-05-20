import styled from 'styled-components';
import { projectsContext } from '@/context';
import { BasicModal } from '@/components';
import { Button } from '@/elements';
import { removeUserFromProject } from '../api';

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

type Props = {
  open: boolean;
  handleClose: () => void;
  userInfo: any;
};

export const UserModalRemove = ({ open, handleClose, userInfo }: Props) => {
  const { currentProject } = projectsContext();

  const handleDelete = async () => {
    await removeUserFromProject(userInfo.email, currentProject.code);
    console.log('deleted');
  };

  return (
    <BasicModal modalOpen={open} handleClose={handleClose}>
      <Container>
        <Heading>Remove user from project</Heading>
        <NormalText>
          Are you sure you want to remove the user <Bold>{userInfo.display_name}</Bold> from the
          project?
        </NormalText>
        <Button color="var(--red)" hoverColor="var(--dark-red)" onClick={handleDelete}>
          Remove user
        </Button>
      </Container>
    </BasicModal>
  );
};
