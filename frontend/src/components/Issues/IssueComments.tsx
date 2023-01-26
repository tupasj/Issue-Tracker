import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { UserContext } from '@/context';

const Container = styled.div``;

const CommentContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const UserBlock = styled.div``;

const Comment = styled.div`
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--extra-light-blue);
`;

const CommentTop = styled.div`
  padding: 12px;
  background-color: var(--extra-light-blue);
`;

const CommentBottom = styled.div`
  padding: 12px;
`;

const ImageContainer = styled.div`
  padding: 4px;
  margin-left: 10px;
  margin-right: 4px;
  height: 32px;
  width: 32px;
  text-align: center;
  border: 1px solid var(--light-gray);
  border-radius: 50%;
  background-color: var(--white);
  cursor: pointer;
`;

const Image = styled.img`
  width: 32px;
`;

const Bold = styled.span`
  font-weight: 600;
`;

const Gray = styled.span`
  color: var(--medium-gray);
`;

type Props = {
  originalPoster: string;
  postedTime: string;
  description: string;
};

export const IssueComments = ({ originalPoster, postedTime, description }: Props) => {
  const [userInfo, setUserInfo] = useState<any>();
  const userCtx = useContext(UserContext);
  const email = userCtx?.email;

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axiosInstance.get(`/user/email=${email}`);
        setUserInfo(response.data);
      } catch (error: any) {
        axiosErrorHandler(error);
      }
    };
    getUserInfo();
  }, []);

  return (
    <Container>
      <CommentContainer>
        <ImageContainer>
          <Image src={userInfo?.profile_image} alt="user profile image" />
        </ImageContainer>
        <Comment>
          <CommentTop>
            <Bold>{originalPoster}</Bold>
            <Gray> commented on {postedTime}</Gray>
          </CommentTop>
          <CommentBottom>{description}</CommentBottom>
        </Comment>
      </CommentContainer>
    </Container>
  );
};
