import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { userContext, projectsContext } from '@/context';
import { makeUpdatedIssues } from '@/utils/issueUtils';
import { updateIssueLabels } from '@/features/issues';
import { IssueOptionBlock } from './IssueOptionBlock';

const Container = styled.div``;

type Props = {
  labels: any[];
  issueNumber: number;
  issues: any[];
  setIssues: React.Dispatch<React.SetStateAction<any>>;
};

export const IssueOptions = ({ labels, issueNumber, issues, setIssues }: Props) => {
  const [labelNamesState, setLabelNamesState] = useState<string[]>([]);
  const labelItems = [
    'bug',
    'duplicate',
    'help wanted',
    'new feature',
    'question',
    'refactoring',
    "won't fix",
  ];
  const { email } = userContext();
  const { currentProject } = projectsContext();

  const handleLabelSubmit = async (labelNames: string[]) => {
    const updatedIssue = await updateIssueLabels(issueNumber, currentProject, labelNames, email);
    const updatedIssues = makeUpdatedIssues(issues, updatedIssue);
    setIssues(updatedIssues);
  };

  useEffect(() => {
    const labelNames = labels.map((item: any) => item.name);
    setLabelNamesState(labelNames);

    // const getIssueUsers = async () => {
    //   try {
    //     const getIssueUsers = await axiosInstance.get(
    //       `/issues/issueNumber=${issueNumber}/projectCode=${currentProject.code}/users`
    //     );
    //   } catch (error: any) {
    //     axiosErrorHandler(error);
    //   }
    // };
    // getIssueUsers();
  }, []);

  return (
    <Container>
      <IssueOptionBlock title="Milestone" emptyTextPlaceholder="No milestone assigned" />
      <IssueOptionBlock
        title="Labels"
        emptyTextPlaceholder="No labels added"
        handleSubmit={handleLabelSubmit}
        multi={true}
        label="labels"
        items={labels}
        itemNames={labelItems}
        defaultState={labelNamesState}
        setState={setLabelNamesState}
      />
      <IssueOptionBlock title="Assignees" emptyTextPlaceholder="No users assigned to this Issue" />
    </Container>
  );
};
