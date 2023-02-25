import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { usePriorityChartData, useLabelChartData, useStatusChartData } from '@/hooks';
import { projectsContext } from '@/context';
import { Chart } from './Chart';
import { getIssues } from '@/features/issues';
import { NoIssuesNotification } from './NoIssuesNotification';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 90%;
`;

export const Dashboard = () => {
  const [allIssues, setAllIssues] = useState<any[]>([]);
  const [issuesLoading, setIssuesLoading] = useState(true);
  const priorityChartData = usePriorityChartData(allIssues);
  const labelChartData = useLabelChartData(allIssues);
  const statusChartData = useStatusChartData(allIssues);
  const { currentProject } = projectsContext();

  useEffect(() => {
    const fetchIssues = async () => {
      const issues = await getIssues(currentProject);
      setAllIssues(issues);
      setIssuesLoading(false);
    };

    if (currentProject) {
      fetchIssues();
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
          data={statusChartData.labels}
          colors={statusChartData.colors}
          chartDataLoading={statusChartData.isLoading}
        />
        <Chart
          title="Overall progress"
          issuesLoading={issuesLoading}
          data={statusChartData.labels}
          colors={statusChartData.colors}
          chartDataLoading={statusChartData.isLoading}
        />
      </Container>
      {allIssues.length === 0 && <NoIssuesNotification />}
    </>
  );
};
