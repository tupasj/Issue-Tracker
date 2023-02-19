import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { userContext, projectsContext } from '@/context';
import { createComment } from '@/features/comments';
import { createIssue } from '@/features/issues';
import { getUsers } from '@/features/users';
import { getMilestones } from '@/features/milestones';
import { BasicModal, BasicSelect, MultiSelect, MultiSelectObjects } from '@/components/UI';

const modalStyling = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#ffffff',
  boxShadow: 4,
};

const Container = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px;
  background-color: #f7faf9;
  @media (max-width: 410px) {
    flex-wrap: wrap;
  }
`;

const IssueInfo = styled.div``;

const IssueOptions = styled.div``;

const IssueTitle = styled.input`
  padding: 4px;
  margin-bottom: 4px;
  width: 95%;
`;

const IssueTextarea = styled.textarea`
  padding: 4px;
  margin-bottom: 8px;
  height: 180px;
  width: 95%;
  resize: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 4px;
  justify-content: flex-end;
  padding-right: 4px;
`;

type Props = {
  open: any;
  handleClose: () => void;
  issues: any[];
  setIssues: React.Dispatch<React.SetStateAction<any>>;
};

export const IssueAddModal = ({ open, handleClose, issues, setIssues }: Props) => {
  const [title, setTitle] = useState('');
  const [commentTextContent, setCommentTextContent] = useState('');
  const [priority, setPriority] = useState('none');
  const [labels, setLabels] = useState<string[]>([]);
  const [assignees, setAssignees] = useState<string[]>([]);
  const [projectUsers, setProjectUsers] = useState<any[]>([]);
  const [projectMilestones, setProjectMilestones] = useState<any[]>([]);
  const [currentMilestone, setcurrentMilestone] = useState<any>();
  const { email } = userContext();
  const { currentProject } = projectsContext();

  const addComment = async (issueNumber: number) => {
    const payload = { text_content: commentTextContent, code: currentProject.code };
    await createComment(issueNumber, email, payload);
  };

  const addAssignees = async () => {
    // await axiosInstance.put(`/issues/issueNumber=:issueNumber/projectCode=:projectCode/users`);
  };

  const createNewIssue = async (e: any) => {
    e.preventDefault();
    const payload = {
      code: currentProject.code,
      email,
      title,
      assignees,
      priority,
      labels,
      currentMilestone,
    };
    const newIssue: any = await createIssue(payload);
    setIssues([...issues, newIssue]);
    if (commentTextContent !== '') {
      addComment(newIssue.issue_number);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers(currentProject);
      setProjectUsers(users);
    };
    const fetchMilestones = async () => {
      const milestones = await getMilestones(currentProject);
      const milestoneSelections = [...milestones, { title: 'none' }];
      setProjectMilestones(milestoneSelections);
    };

    if (open) {
      fetchUsers();
      fetchMilestones();
    } else if (!open) {
      setAssignees([]);
      setcurrentMilestone('none');
    }
  }, [open]);

  return (
    <BasicModal modalOpen={open} handleClose={handleClose} styling={modalStyling}>
      <Container>
        <IssueInfo>
          <IssueTitle type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
          <IssueTextarea
            id="description"
            name="description"
            placeholder="Description"
            onChange={(e) => setCommentTextContent(e.target.value)}
          />
          <ButtonContainer>
            <button>Upload image</button>
            <button onClick={createNewIssue}>Submit Issue</button>
          </ButtonContainer>
        </IssueInfo>
        <IssueOptions>
          <div>Assignees</div>
          <MultiSelectObjects
            label="assignees"
            items={projectUsers}
            defaultState={assignees}
            setState={setAssignees}
          />
          <div>Priority</div>
          <BasicSelect
            label="priority"
            items={['high', 'medium', 'low', 'none']}
            defaultState={priority}
            setState={setPriority}
          />
          <div>Labels</div>
          <MultiSelect
            label="labels"
            items={[
              'bug',
              'duplicate',
              'help wanted',
              'new feature',
              'question',
              'refactoring',
              "won't fix",
            ]}
            defaultState={labels}
            setState={setLabels}
          />
          <div>Milestones</div>
          <BasicSelect
            label="milestones"
            items={projectMilestones}
            defaultState={currentMilestone}
            setState={setcurrentMilestone}
            milestones={true}
          />
        </IssueOptions>
      </Container>
    </BasicModal>
  );
};
