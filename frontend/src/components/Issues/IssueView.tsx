import styled from 'styled-components';
import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { UserContext } from '@/context/UserContext';
import { convertTimestamp } from '@/utils/issueUtils';
import { IssueComments, IssueOptions } from '@/components/Issues';
import { IssuePriority } from '@/elements/Issue';
import { Button } from '@/elements/UI';

const Container = styled.div``;

const TitleContainer = styled.div`
  font-size: 2rem;
  margin-bottom: 8px;
`;

const Title = styled.span`
  font-weight: 600;
`;

const SecondaryText = styled.span`
  padding-left: 4px;
  font-weight: 400;
  color: var(--medium-gray);
`;

const TitleSecondaryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.25;
`;

const IssueOpenStatus = styled.div<any>`
  padding: 6px;
  border-radius: 18px;
  text-align: center;
  color: var(--white);
  background-color: ${(props) => (props.closed ? 'var(--medium-gray)' : 'var(--green)')};
`;

const AdditionalInfo = styled.div`
  color: var(--medium-gray);
`;

const Username = styled.span`
  color: var(--black);
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: var(--light-gray);
  margin-top: 14px;
  margin-bottom: 14px;
`;

const NewCommentTextarea = styled.textarea`
  padding: 0;
  margin-bottom: 8px;
  border-radius: 4px;
  width: 100%;
  border: 1px solid var(--medium-gray);
  resize: none;
`;

const CommentsAndOptionsFlexContainer = styled.div`
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
`;

const CommentsFlexWrapper = styled.div`
  flex-grow: 1;
`;

const OptionsWrapper = styled.div`
  width: 200px;
`;

type Props = {
  issues: any[];
};

export const IssueView = ({ issues }: Props) => {
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState('');
  let { issueNumber } = useParams();
  const userCtx = useContext(UserContext);
  const email = userCtx?.email;
  const filterResult = issues.filter((issue) => issue.issue_number == issueNumber);
  const currentIssue = filterResult[0];
  const formattedTime = convertTimestamp(currentIssue.createdAt);

  const addComment = async () => {
    try {
      const newComment = await axiosInstance.post(
        `/issues/issueNumber=${currentIssue.issue_number}/user/email=${email}/comment`,
        { text_content: commentText }
      );
      setComments([...comments, newComment.data]);
      setCommentText('');
    } catch (error: any) {
      axiosErrorHandler(error);
    }
  };

  return (
    <Container>
      <TitleContainer>
        <Title>{currentIssue.title}</Title>
        <SecondaryText>#{currentIssue.issue_number}</SecondaryText>
      </TitleContainer>
      <TitleSecondaryContainer>
        {currentIssue.is_open ? (
          <IssueOpenStatus>
            <FontAwesomeIcon icon={faForward} /> Open
          </IssueOpenStatus>
        ) : (
          <IssueOpenStatus closed>
            <FontAwesomeIcon icon={faCircleCheck} /> Closed
          </IssueOpenStatus>
        )}
        <AdditionalInfo>
          Priority: <IssuePriority priority={currentIssue.priority} /> | Posted by{' '}
          <Username>{currentIssue.posted_by}</Username> on {formattedTime}
        </AdditionalInfo>
      </TitleSecondaryContainer>
      <Divider />
      <CommentsAndOptionsFlexContainer>
        <CommentsFlexWrapper>
          <IssueComments
            comments={comments}
            setComments={setComments}
            currentIssueNumber={currentIssue.issue_number}
          />
          <Divider />
          <NewCommentTextarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button right onClick={addComment}>
            Add comment
          </Button>
        </CommentsFlexWrapper>
        <OptionsWrapper>
          <IssueOptions />
        </OptionsWrapper>
      </CommentsAndOptionsFlexContainer>
    </Container>
  );
};
