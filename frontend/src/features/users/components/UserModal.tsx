import styled from 'styled-components';
import { BasicModal } from '@/components';
import { capitalizeFirstLetter } from '@/utils/stringUtils';
import { getUserStatusColor } from '@/utils/userUtils';

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
  gap: 8px;
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

const ImageContainer = styled.div`
  padding: 4px;
  align-self: center;
  height: 36px;
  width: 36px;
  text-align: center;
  border: 1px solid var(--light-gray);
  border-radius: 50%;
  background-color: var(--white);
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 36px;
`;

type StatusIndicatorProps = {
  statusColor: any;
};

const StatusIndicator = styled.div<StatusIndicatorProps>`
  display: inherit;
  position: absolute;
  bottom: 2px;
  left: -5px;
  height: 10px;
  width: 10px;
  border: 1px solid var(--light-gray);
  border-radius: 50%;
  background-color: ${(props) => props.statusColor};
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DisplayName = styled.div`
  font-weight: 600;
  line-height: 1.5;
  cursor: pointer;
  &:hover {
    color: var(--blue);
  }
`;

const Type = styled.div`
  color: var(--light-medium-gray);
`;

type Props = {
  open: boolean;
  handleClose: () => void;
  userInfo: any;
};

export const UserModal = ({ open, handleClose, userInfo }: Props) => {
  return (
    <BasicModal modalOpen={open} handleClose={handleClose}>
      <Container>
        {userInfo && (
          <>
            <Flex>
              <ImageContainer>
                <ImageWrapper>
                  <StatusIndicator statusColor={getUserStatusColor(userInfo.status)} />
                  <Image src={userInfo.profile_image} />
                </ImageWrapper>
              </ImageContainer>
              <UserInfoContainer>
                <DisplayName>{userInfo.display_name}</DisplayName>
                <Type>{userInfo.type}</Type>
              </UserInfoContainer>
            </Flex>
            <Flex>
              <FlexVertical>
                <Bold>Status: </Bold>
                {capitalizeFirstLetter(userInfo.status)}
                <Bold>Email: </Bold>
                {userInfo.email}
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
                <Bold>Name: </Bold>
                {`${userInfo.first_name} ${userInfo.last_name}`}
              </FlexVertical>
            </Flex>
          </>
        )}
      </Container>
    </BasicModal>
  );
};
