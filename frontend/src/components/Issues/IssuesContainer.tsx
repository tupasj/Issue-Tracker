import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { axiosInstance, axiosErrorHandler } from '@/lib/axios';
import { ProjectsContext } from '@/context';
import { IssuesOptionsBar } from '@/components/Issues';
import { Issue } from '@/elements/Issue';

const Container = styled.div`
  height: 100%;
  border-radius: 6px;
  background-color: #f7faf9;
`;

const IssuesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
`;

export const IssuesContainer = () => {
  const [issues, setIssues] = useState<any[]>([]);
  const { currentProject } = useContext(ProjectsContext) as any;

  useEffect(() => {
    const getIssues = async () => {
      try {
        const issues = await axiosInstance.get(`projects/code=${currentProject.code}/issues`);
        setIssues(issues.data);
      } catch (error: any) {
        axiosErrorHandler(error);
      }
    };
    getIssues();
  }, []);

  useEffect(() => {
    console.log('issues: ', issues);
  }, [issues]);

  return (
    <Container>
      <IssuesOptionsBar issues={issues} setIssues={setIssues} />
      <IssuesList>
        {issues.map((issue) => (
          <Issue
            key={issue.issue_number}
            title={issue.title}
            description={issue.description}
            number={issue.issue_number}
            timePosted={issue.createdAt}
            postedBy={issue.posted_by}
            isOpen={issue.is_open}
            priority={issue.priority}
          />
        ))}
      </IssuesList>
    </Container>
  );
};
