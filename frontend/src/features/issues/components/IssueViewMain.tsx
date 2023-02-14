import styled from 'styled-components';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPlus, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { userContext, projectsContext } from '@/context';
import { makeUpdatedIssues } from '@/utils/issueUtils';
import { createComment } from '@/features/comments';
import { updateIssueOpenStatus } from '@/features/issues';
import { IssueComments } from './IssueComments';
import { Button } from '@/elements/UI';

const Container = styled.div`
  flex-grow: 1;
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
  currentIssue: any;
};

export const IssueViewMain = ({ issues, setIssues, currentIssue }: Props) => {
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState('');
  const { email } = userContext();
  const { currentProject } = projectsContext();

  const addComment = async () => {
    const payload = { text_content: commentText, code: currentProject.code };
    const newComment = await createComment(currentIssue, email, payload);
    setComments([...comments, newComment]);
    setCommentText('');
  };

  const toggleIssueOpenStatus = async () => {
    const newStatus = currentIssue.is_open ? false : true;
    const updatedIssue = await updateIssueOpenStatus(currentIssue, newStatus);
    if (updatedIssue) {
      const updatedIssues = makeUpdatedIssues(issues, updatedIssue);
      setIssues(updatedIssues);
    }
  };

  return (
    <Container>
      <IssueComments
        comments={comments}
        setComments={setComments}
        currentIssueNumber={currentIssue.issue_number}
        currentProjectCode={currentProject.code}
      />
      <Divider />
      <NewCommentTextarea value={commentText} onChange={(e) => setCommentText(e.target.value)} />
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
    </Container>
  );
};
