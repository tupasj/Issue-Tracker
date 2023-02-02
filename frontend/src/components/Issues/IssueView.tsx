import styled from 'styled-components';
import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faCircleCheck, faPlus, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { UserContext, ProjectsContext } from '@/context';
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

const CloseIssueButton = styled.button`
  padding: 6px;
  width: 150px;
  border-radius: 4px;
  background-color: var(--light-gray);
  color: var(--black);
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: transform 200ms;
  &:hover {
    background-color: var(--light-medium-gray);
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  flex-wrap: wrap;
`;

type Props = {
  issues: any[];
  setIssues: React.Dispatch<React.SetStateAction<any>>;
};

export const IssueView = ({ issues, setIssues }: Props) => {
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState('');
  let { issueNumber } = useParams();
  const userCtx = useContext(UserContext);
  const email = userCtx?.email;
  const filterResult = issues.filter((issue) => issue.issue_number == issueNumber);
  const currentIssue = filterResult[0];
  const formattedTime = convertTimestamp(currentIssue.createdAt);
  const { currentProject } = useContext(ProjectsContext) as any;
  const currentProjectCode = currentProject.code;

  const addComment = async () => {
    try {
      const newComment = await axiosInstance.post(
        `/issues/issueNumber=${currentIssue.issue_number}/user/email=${email}/comment`,
        { text_content: commentText, code: currentProjectCode }
      );
      setComments([...comments, newComment.data]);
      setCommentText('');
    } catch (error: any) {
      axiosErrorHandler(error);
    }
  };

  const toggleIssueOpenStatus = async () => {
    try {
      let updatedIssueOpenStatus;
      if (currentIssue.is_open === true) {
        updatedIssueOpenStatus = false;
      } else if (currentIssue.is_open === false) {
        updatedIssueOpenStatus = true;
      }
      const updatedIssueResponse: any = await axiosInstance.patch(
        `/projects/code=${currentIssue.projectCode}/issue/issueNumber=${currentIssue.issue_number}`,
        { is_open: updatedIssueOpenStatus }
      );
      const updatedIssue = updatedIssueResponse.data;
      const updatedIssues = issues.map((issue) => {
        if (issue.issue_number === updatedIssue.issue_number) {
          return {
            ...updatedIssue,
          };
        } else {
          return issue;
        }
      });
      setIssues(updatedIssues);
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
          <Username>{currentIssue.postedBy}</Username> on {formattedTime}
        </AdditionalInfo>
      </TitleSecondaryContainer>
      <Divider />
      <CommentsAndOptionsFlexContainer>
        <CommentsFlexWrapper>
          <IssueComments
            comments={comments}
            setComments={setComments}
            currentIssueNumber={currentIssue.issue_number}
            currentProjectCode={currentProjectCode}
          />
          <Divider />
          <NewCommentTextarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <ButtonsWrapper>
            <CloseIssueButton onClick={toggleIssueOpenStatus}>
              {currentIssue.is_open ? (
                <>
                  Close Issue <FontAwesomeIcon icon={faCircleCheck} />
                </>
              ) : (
                <>
                  Reopen Issue <FontAwesomeIcon icon={faFolderOpen} />
                </>
              )}
            </CloseIssueButton>
            <Button right onClick={addComment}>
              Add comment <FontAwesomeIcon icon={faPlus} />
            </Button>
          </ButtonsWrapper>
        </CommentsFlexWrapper>
        <OptionsWrapper>
          <IssueOptions labels={currentIssue.labels} />
        </OptionsWrapper>
      </CommentsAndOptionsFlexContainer>
    </Container>
  );
};
