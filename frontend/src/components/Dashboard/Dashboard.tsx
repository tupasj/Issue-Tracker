import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { usePriorityChartData, useLabelChartData } from '@/hooks';
import { projectsContext } from '@/context';
import { Chart } from '@/components/Dashboard';
import { getIssues } from '@/features/issues';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 90%;
`;

export const Dashboard = () => {
  const [allIssues, setAllIssues] = useState<any[]>([]);
  const priorityChartData = usePriorityChartData(allIssues);
  const labelChartData = useLabelChartData(allIssues);
  const { currentProject } = projectsContext();

  useEffect(() => {
    const fetchIssues = async () => {
      const issues = await getIssues(currentProject);
      setAllIssues(issues);
    };

    if (currentProject) {
      fetchIssues();
    }
  }, [currentProject]);

  return (
    <Container>
      {priorityChartData.labels[0] && priorityChartData.colors[0] && (
        <Chart
          title="Issues by priority"
          data={priorityChartData.labels}
          colors={priorityChartData.colors}
        />
      )}
      {labelChartData.labels[0] && labelChartData.colors[0] && (
        <Chart
          title="Issues by label"
          data={labelChartData.labels}
          colors={labelChartData.colors}
        />
      )}
      {/* <Chart title="Issues by status" data={data} colors={colors} />
      <Chart title="Personal progress" data={data} colors={colors} /> */}
    </Container>
  );
};
