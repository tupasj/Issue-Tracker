import styled from 'styled-components';
import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { makeUpdatedIssues } from '@/utils/issueUtils';
import { ProjectsContext } from '@/context';
import { BasicSelect, Button } from '@/elements/UI';

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

type Props = {
  issues: any[];
  setIssues: React.Dispatch<React.SetStateAction<any>>;
};

export const IssueViewModalContent = ({ issues, setIssues }: Props) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const items = ['none', 'high', 'medium', 'low'];
  const { currentProject } = useContext(ProjectsContext) as any;
  let { issueNumber } = useParams() as any;
  const issueNumberInt = parseInt(issueNumber);
  const navigate = useNavigate();

  const submitTitle = async () => {
    console.log('title: ', title);
  };

  const submitPriority = async () => {
    try {
      const updatedIssue = await axiosInstance.patch(
        `/issues/issueNumber=${issueNumberInt}/projectCode=${currentProject.code}/priority`,
        { priority }
      );
      const updatedIssues = makeUpdatedIssues(issues, updatedIssue.data);
      setIssues(updatedIssues);
    } catch (error: any) {
      axiosErrorHandler(error);
    }
  };

  const deleteIssue = async () => {
    try {
      const deleteResponse = await axiosInstance.delete(
        `/issues/issueNumber=${issueNumberInt}/projectCode=${currentProject.code}`
      );
      if (deleteResponse.status === 200) {
        navigate('/app/issues/open');
      }
    } catch (error: any) {
      axiosErrorHandler(error);
    }
  };

  return (
    <Container>
      <H2>Issue options</H2>
      <H3>Edit title</H3>
      <InputWrapper>
        <Input onChange={(e) => setTitle(e.target.value)} />
        <button onClick={submitTitle}>Confirm</button>
      </InputWrapper>
      <H3>Change priority</H3>
      <InputWrapper>
        <BasicSelect
          label="priority"
          items={items}
          defaultState={priority}
          setState={setPriority}
        />
        <button onClick={submitPriority}>Confirm</button>
      </InputWrapper>
      <H3>Delete Issue</H3>
      <Button onClick={deleteIssue} color="var(--red)" hoverColor="var(--dark-red)">
        Delete Issue <FontAwesomeIcon icon={faTrash} />
      </Button>
    </Container>
  );
};
