import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { UserContext, ProjectsContext } from '@/context';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { makeUpdatedIssues } from '@/utils/issueUtils';
import { IssueOptionBlock } from '@/components/Issues';

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
  const userCtx = useContext(UserContext);
  const { currentProject } = useContext(ProjectsContext) as any;

  const handleLabelSubmit = async (labelNames: string[]) => {
    try {
      const response = await axiosInstance.patch(
        `/issues/issueNumber=${issueNumber}/projectCode=${currentProject.code}/labels`,
        { labelNames, email: userCtx?.email }
      );
      const updatedIssues = makeUpdatedIssues(issues, response.data);
      setIssues(updatedIssues);
    } catch (error: any) {
      axiosErrorHandler(error);
    }
  };

  useEffect(() => {
    const labelNames = labels.map((item: any) => item.name);
    setLabelNamesState(labelNames);
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
