import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { usePriorityChartData, useLabelChartData, useStatusChartData } from '@/hooks';
import { projectsContext, userContext } from '@/context';
import { Chart } from './Chart';
import { getUserIssues } from '@/features/issues';
import { getIssues } from '@/features/issues';
import { NoIssuesNotification } from './NoIssuesNotification';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
`;

export const Dashboard = () => {
  const [allIssues, setAllIssues] = useState<any[]>([]);
  const [userIssues, setUserIssues] = useState<any[]>([]);
  const [issuesLoading, setIssuesLoading] = useState(true);
  const priorityChartData = usePriorityChartData(allIssues);
  const labelChartData = useLabelChartData(allIssues);
  const overallStatusChartData = useStatusChartData(allIssues);
  const personalStatusChartData = useStatusChartData(userIssues);
  const { currentProject } = projectsContext();
  const { email } = userContext();

  useEffect(() => {
    const fetchIssues = async () => {
      const issues = await getIssues(currentProject);
      setAllIssues(issues);
      setIssuesLoading(false);
    };
    const fetchUserIssues = async () => {
      const userIssuesOpen = await getUserIssues(email, 'true');
      const userIssuesClosed = await getUserIssues(email, 'false');
      const userIssues = userIssuesOpen.concat(userIssuesClosed);
      setUserIssues(userIssues);
      setIssuesLoading(false);
    };

    if (currentProject) {
      fetchIssues();
      fetchUserIssues();
    }
  }, [currentProject]);

  return (
    <>
      <Container>
        <Chart
          title="Issues by priority"
          issuesLoading={issuesLoading}
          data={priorityChartData.labels}
          colors={priorityChartData.colors}
          chartDataLoading={priorityChartData.isLoading}
        />
        <Chart
          title="Issues by label"
          issuesLoading={issuesLoading}
          data={labelChartData.labels}
          colors={labelChartData.colors}
          chartDataLoading={labelChartData.isLoading}
        />
        <Chart
          title="Overall progress"
          issuesLoading={issuesLoading}
          data={overallStatusChartData.labels}
          colors={overallStatusChartData.colors}
          chartDataLoading={overallStatusChartData.isLoading}
        />
        <Chart
          title="Personal progress"
          issuesLoading={issuesLoading}
          data={personalStatusChartData.labels}
          colors={personalStatusChartData.colors}
          chartDataLoading={personalStatusChartData.isLoading}
        />
      </Container>
      {allIssues.length === 0 && <NoIssuesNotification />}
    </>
  );
};
