import styled from 'styled-components';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { makeUpdatedIssues } from '@/utils/issueUtils';
import { projectsContext, userContext } from '@/context';
import { updateIssuePriority, updateIssueTitle, deleteIssue } from '@/features/issues';
import { Button } from '@/elements';
import { BasicSelect } from '@/components/UI';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 26px;
  padding-bottom: 26px;
  padding-right: 18px;
  padding-left: 18px;
`;

const Input = styled.input`
  height: 32px;
  padding-left: 6px;
  padding-right: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const H2 = styled.h2`
  font-weight: 600;
`;

const H3 = styled.h3`
  padding-top: 8px;
  font-style: italic;
`;

const Notification = styled.div`
  padding-top: 6px;
  font-style: italic;
`;

type Props = {
  issues: any[];
  setIssues: React.Dispatch<React.SetStateAction<any>>;
  headerInfo: any;
  setHeaderInfo: React.Dispatch<React.SetStateAction<any>>;
  deleteNotification: string;
  setDeleteNotification: React.Dispatch<React.SetStateAction<string>>;
};

export const IssueViewOptionsModal = ({
  issues,
  setIssues,
  headerInfo,
  setHeaderInfo,
  deleteNotification,
  setDeleteNotification,
}: Props) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const items = ['none', 'high', 'medium', 'low'];
  const { currentProject } = projectsContext();
  const { type } = userContext();
  let { issueNumber } = useParams() as any;
  const issueNumberInt = parseInt(issueNumber);
  const navigate = useNavigate();

  const handleSubmitTitle = async () => {
    const updatedIssue = await updateIssueTitle(issueNumberInt, currentProject, title);
    const updatedIssues = makeUpdatedIssues(issues, updatedIssue);
    setIssues(updatedIssues);
    setHeaderInfo({ title: title, priority: headerInfo.priority });
    setTitle('');
  };

  const handleSubmitPriority = async () => {
    const updatedIssue = await updateIssuePriority(issueNumberInt, currentProject, priority);
    const updatedIssues = makeUpdatedIssues(issues, updatedIssue);
    setIssues(updatedIssues);
    setHeaderInfo({ title: headerInfo.title, priority: priority });
    setPriority('');
  };

  const handleDeleteIssue = async () => {
    // Prevent deletion of demo project items
    if (currentProject.code !== 'r0A3xG3i') {
      const deleteResponse: any = await deleteIssue(issueNumber, currentProject);
      if (deleteResponse.status === 200) {
        navigate('/app/issues/open');
      }
    } else {
      setDeleteNotification(`Can't delete demo project items. Make a new project to test
      out all the features!`);
    }
  };

  return (
    <Container>
      <H2>Issue options</H2>
      <H3>Edit title</H3>
      <InputWrapper>
        <Input onChange={(e) => setTitle(e.target.value)} />
        <button onClick={handleSubmitTitle}>Confirm</button>
      </InputWrapper>
      <H3>Change priority</H3>
      <InputWrapper>
        <BasicSelect
          label="priority"
          items={items}
          defaultState={priority}
          setState={setPriority}
        />
        <button onClick={handleSubmitPriority}>Confirm</button>
      </InputWrapper>
      {type === 'admin' && (
        <>
          <H3>Delete Issue</H3>
          <Button onClick={handleDeleteIssue} color="var(--red)" hoverColor="var(--dark-red)">
            Delete Issue <FontAwesomeIcon icon={faTrash} />
          </Button>
          <Notification>{deleteNotification}</Notification>
        </>
      )}
    </Container>
  );
};
