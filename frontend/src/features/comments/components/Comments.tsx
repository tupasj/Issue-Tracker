import styled from 'styled-components';
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
  margin-left: 10px;
  margin-right: 4px;
  width: 50px;
  text-align: center;
  border: 2px solid var(--light-gray);
  border-radius: 50%;
  background-color: var(--white);
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 50%;
`;

const Bold = styled.span`
  font-weight: 600;
`;

const Gray = styled.span`
  color: var(--medium-gray);
`;

type Props = {
  comments: any;
};

export const Comments = ({ comments }: Props) => {
  return (
    <Container>
      {comments[0] &&
        comments.map((comment: any) => {
          return (
            <CommentContainer key={comment.id}>
              <div>
                <ImageContainer>
                  {comment.profile_image && (
                    <Image src={comment.profile_image} alt="user profile image" />
                  )}
                </ImageContainer>
              </div>
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
