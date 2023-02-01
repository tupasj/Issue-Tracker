import styled from 'styled-components';
import { useEffect } from 'react';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { convertTimestamp } from '@/utils/issueUtils';

const Container = styled.div``;

const CommentContainer = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 14px;
  padding-bottom: 14px;
`;

const Comment = styled.div<any>`
  width: 100%;
  border-radius: 8px;
  border: ${(props) => (props.loading ? 'none' : '1px solid var(--extra-light-blue)')};
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
  comments: any;
  setComments: React.Dispatch<React.SetStateAction<any>>;
  currentIssueNumber: number;
  currentProjectCode: string;
};

export const IssueComments = ({
  comments,
  setComments,
  currentIssueNumber,
  currentProjectCode,
}: Props) => {
  useEffect(() => {
    const getComments = async () => {
      try {
        const commentsResponse: any = await axiosInstance.get(
          `/issues/issueNumber=${currentIssueNumber}/projectCode=${currentProjectCode}/comments`
        );
        setComments(commentsResponse.data);
      } catch (error: any) {
        axiosErrorHandler(error);
      }
    };
    getComments();
  }, []);

  return (
    <Container>
      {comments[0] &&
        comments.map((comment: any) => {
          return (
            <CommentContainer key={comment.id}>
              <ImageContainer>
                {comment.profile_image && (
                  <Image src={comment.profile_image} alt="user profile image" />
                )}
              </ImageContainer>
              <Comment>
                <CommentTop>
                  <Bold>{comment.display_name}</Bold>
                  <Gray> commented on {convertTimestamp(comment.createdAt)}</Gray>
                </CommentTop>
                <CommentBottom>{comment.text_content}</CommentBottom>
              </Comment>
            </CommentContainer>
          );
        })}
    </Container>
  );
};
