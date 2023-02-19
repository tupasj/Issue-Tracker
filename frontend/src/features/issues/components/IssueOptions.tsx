import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { userContext, projectsContext } from '@/context';
import { makeUpdatedIssues } from '@/utils/issueUtils';
import { BasicSelect, MultiSelect, MultiSelectObjects } from '@/components/UI';
import { updateIssueLabels } from '@/features/issues';
import { getMilestone, getMilestones } from '@/features/milestones';
import { getUsers } from '@/features/users';
import { IssueOptionBlock } from './IssueOptionBlock';

const Container = styled.div``;

type Props = {
  labels: any[];
  issueNumber: number;
  issues: any[];
  setIssues: React.Dispatch<React.SetStateAction<any>>;
};

export const IssueOptions = ({ labels, issueNumber, issues, setIssues }: Props) => {
  const [labelNames, setLabelNames] = useState<string[]>([]);
  const labelItems = [
    'bug',
    'duplicate',
    'help wanted',
    'new feature',
    'question',
    'refactoring',
    "won't fix",
  ];
  const [projectMilestones, setProjectMilestones] = useState<any[]>([]);
  const [currentMilestone, setcurrentMilestone] = useState<any>();
  const [assignees, setAssignees] = useState<string[]>([]);
  const [projectUsers, setProjectUsers] = useState<any[]>([]);
  const { email } = userContext();
  const { currentProject } = projectsContext();

  const handleMilestoneSubmit = async () => {
    // update milestone for current issue
  };

  const handleLabelSubmit = async (labels: any[]) => {
    const updatedIssue = await updateIssueLabels(issueNumber, currentProject, labels, email);
    const updatedIssues = makeUpdatedIssues(issues, updatedIssue);
    setIssues(updatedIssues);
  };

  const handleAssigneeSubmit = async () => {
    // update assignees for current issue
  };

  useEffect(() => {
    const labelNamesArray = labels.map((item: any) => item.name);
    const fetchMilestones = async () => {
      const milestone = await getMilestone(currentProject, issueNumber);
      const milestones = await getMilestones(currentProject);
      const milestoneSelections = [...milestones, { title: 'none' }];
      setcurrentMilestone(milestone);
      setProjectMilestones(milestoneSelections);
    };
    const fetchUsers = async () => {
      const users = await getUsers(currentProject);
      setProjectUsers(users);
    };

    setLabelNames(labelNamesArray);
    fetchMilestones();
    fetchUsers();
  }, []);

  return (
    <Container>
      <IssueOptionBlock
        title="Milestone"
        emptyTextPlaceholder="No milestone assigned"
        handleSubmit={handleMilestoneSubmit}
        changes={currentMilestone}
      >
        <BasicSelect
          label="milestones"
          items={projectMilestones}
          defaultState={currentMilestone}
          setState={setcurrentMilestone}
          milestones={true}
        />
      </IssueOptionBlock>
      <IssueOptionBlock
        title="Labels"
        emptyTextPlaceholder="No labels added"
        handleSubmit={handleLabelSubmit}
        changes={labelNames}
        labels={labels}
      >
        <MultiSelect
          label="labels"
          items={labelItems}
          defaultState={labelNames}
          setState={setLabelNames}
        />
      </IssueOptionBlock>
      <IssueOptionBlock
        title="Assignees"
        emptyTextPlaceholder="No users assigned to this Issue"
        handleSubmit={handleAssigneeSubmit}
        changes={projectUsers}
      >
        <MultiSelectObjects
          label="assignees"
          items={projectUsers}
          defaultState={assignees}
          setState={setAssignees}
        />
      </IssueOptionBlock>
    </Container>
  );
};
