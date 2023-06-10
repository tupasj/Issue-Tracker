import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { userContext, projectsContext } from '@/context';
import { makeUpdatedIssues } from '@/utils/issueUtils';
import { BasicSelect, MultiSelect, MultiSelectObjects } from '@/components/UI';
import {
  updateIssueLabels,
  updateIssueMilestone,
  updateIssueAssignees,
  removeIssueMilestone,
} from '@/features/issues';
import { getUsers } from '@/features/users';
import { getMilestone, getMilestones } from '@/features/milestones';
import { getIssueUsers } from '../api';
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
  const [assignees, setAssignees] = useState<any[]>([]);
  const [projectUsers, setProjectUsers] = useState<any[]>([]);
  const { email } = userContext();
  const { currentProject } = projectsContext();

  const handleMilestoneSubmit = async () => {
    if (currentMilestone.title === 'none') {
      await removeIssueMilestone(issueNumber, currentProject);
      return;
    }
    await updateIssueMilestone(issueNumber, currentProject, currentMilestone);
  };

  const handleLabelSubmit = async (labels: any[]) => {
    const updatedIssue = await updateIssueLabels(issueNumber, currentProject, labels, email);
    const updatedIssues = makeUpdatedIssues(issues, updatedIssue);
    setIssues(updatedIssues);
  };

  const handleAssigneeSubmit = async () => {
    const updatedAssignees = await updateIssueAssignees(issueNumber, currentProject, assignees);
    console.log('updatedAssignees: ', updatedAssignees);
    setAssignees(updatedAssignees);
  };

  useEffect(() => {
    const labelNamesArray = labels.map((item: any) => item.name);
    const fetchMilestones = async () => {
      const milestone = await getMilestone(currentProject, issueNumber);
      const milestones = await getMilestones(currentProject);
      const milestoneSelections = [...milestones, { id: 9999, title: 'none' }];
      setcurrentMilestone(milestone);
      setProjectMilestones(milestoneSelections);
    };
    const fetchProjectUsers = async () => {
      const projectUsers = await getUsers(currentProject);
      setProjectUsers(projectUsers);
    };
    const fetchAssignees = async () => {
      const assignees = await getIssueUsers(issueNumber, currentProject);
      setAssignees(assignees);
    };

    setLabelNames(labelNamesArray);
    fetchMilestones();
    fetchProjectUsers();
    fetchAssignees();
  }, []);

  return (
    <Container>
      <IssueOptionBlock
        title="Milestone"
        emptyTextPlaceholder="No milestone"
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
        emptyTextPlaceholder="No labels"
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
        emptyTextPlaceholder="No assignees"
        handleSubmit={handleAssigneeSubmit}
        changes={assignees}
        assignees={assignees}
        setState={setAssignees}
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
