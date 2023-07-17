import styled from 'styled-components';
import { ResponsiveModal } from '@/components';
import { capitalizeFirstLetter } from '@/utils/stringUtils';
import { UserProfileImage } from './UserProfileImage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px;
  border-radius: 4px;
  background-color: var(--white);
  &:hover {
    background-color: var(--extra-light-gray);
  }
`;

const Flex = styled.div`
  display: flex;
  gap: 22px;
  padding-bottom: 18px;
`;

const FlexVertical = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Bold = styled.span`
  padding-top: 8px;
  font-weight: 600;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
`;

type Props = {
  open: boolean;
  handleClose: () => void;
  userInfo: any;
};

export const UserModal = ({ open, handleClose, userInfo }: Props) => {
  return (
    <ResponsiveModal modalOpen={open} handleClose={handleClose}>
      <Container>
        {userInfo && (
          <>
            <Flex>
              <UserProfileImage user={userInfo} size="120" hideStatus />
              <UserInfoContainer>
                <Bold>Display name: </Bold>
                {userInfo.display_name}
                <Bold>User type: </Bold>
                {userInfo.type}
              </UserInfoContainer>
            </Flex>
            <Flex>
              <FlexVertical>
                <Bold>Name: </Bold>
                {`${userInfo.first_name} ${userInfo.last_name}`}
                <Bold>Status: </Bold>
                {capitalizeFirstLetter(userInfo.status)}
                {userInfo.phone_number && (
                  <>
                    <Bold>Phone number: </Bold>
                    {userInfo.phone_number}
                  </>
                )}
              </FlexVertical>
              <FlexVertical>
                {userInfo.username && (
                  <>
                    <Bold>Username: </Bold>
                    {userInfo.username}
                  </>
                )}
                <Bold>Email: </Bold>
                {userInfo.email}
              </FlexVertical>
            </Flex>
          </>
        )}
      </Container>
    </ResponsiveModal>
  );
};
