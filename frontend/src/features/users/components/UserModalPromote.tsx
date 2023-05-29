import styled from 'styled-components';
import { projectsContext, userContext } from '@/context';
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

const List = styled.ul`
  padding-left: 25%;
  padding-right: 25%;
  padding-top: 12px;
  text-align: start;
  line-height: 1.25;
  list-style-type: disc;
`;

type Props = {
  open: boolean;
  handleClose: () => void;
  userInfo: any;
  setUsers: React.Dispatch<React.SetStateAction<any>>;
};

export const UserModalPromote = ({ open, handleClose, userInfo, setUsers }: Props) => {
  const { currentProject } = projectsContext();
  const { setType } = userContext();

  const handleClick = async () => {
    const payload = { type: 'admin' };
    const response = await updateUserType(userInfo.email, payload);
    if (response.status === 200) {
      setType('admin');
      const users = await getUsers(currentProject);
      setUsers(users);
      handleClose();
    }
  };

  return (
    <BasicModal modalOpen={open} handleClose={handleClose}>
      <Container>
        <Heading>Promote user to admin</Heading>
        <NormalText>
          Are you sure you want to promote <Bold>{userInfo.display_name}</Bold> to an admin user?
          Admins can:
          <List>
            <li>Delete Issues</li>
            <li>Create, edit, and delete milestones</li>
            <li>Delete projects</li>
          </List>
        </NormalText>
        <Button color="var(--green)" hoverColor="var(--dark-green)" onClick={handleClick}>
          Promote to admin
        </Button>
      </Container>
    </BasicModal>
  );
};
