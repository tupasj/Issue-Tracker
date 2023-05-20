import styled from 'styled-components';
import { projectsContext } from '@/context';
import { BasicModal } from '@/components';
import { Button } from '@/elements';
import { getUsers, updateUserType } from '../api';

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
  setUsers: React.Dispatch<React.SetStateAction<any>>;
};

export const UserModalPromote = ({ open, handleClose, userInfo, setUsers }: Props) => {
  const { currentProject } = projectsContext();

  const handleClick = async () => {
    const payload = { type: 'admin' };
    await updateUserType(userInfo.email, payload);
    const users = await getUsers(currentProject);
    setUsers(users);
  };

  return (
    <BasicModal modalOpen={open} handleClose={handleClose}>
      <Container>
        <Heading>Promote user to admin</Heading>
        <NormalText>
          Are you sure you want to promote <Bold>{userInfo.display_name}</Bold> to an admin user?
        </NormalText>
        <Button color="var(--green)" hoverColor="var(--dark-green)" onClick={handleClick}>
          Promote to admin
        </Button>
      </Container>
    </BasicModal>
  );
};
