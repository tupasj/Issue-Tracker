import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { usePriorityChartData } from '@/hooks';
import { issuesContext } from '@/context';
import { Chart } from '@/components/Dashboard';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 90%;
`;

export const Dashboard = () => {
  const [allIssues, setAllIssues] = useState<any[]>([]);
  const { getIssues } = issuesContext();
  const priorityChartData = usePriorityChartData(allIssues);

  const data = [
    { name: 'Group A', value: 33 },
    { name: 'Group B', value: 25 },
    { name: 'Group C', value: 25 },
    { name: 'Group D', value: 17 },
  ];
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const getAllIssues = async () => {
      const allIssues = await getIssues();
      setAllIssues(allIssues);
    };
    getAllIssues();
  }, []);

  return (
    <Container>
      <Chart
        title="Issues by priority"
        data={priorityChartData.labels}
        colors={priorityChartData.colors}
      />
      <Chart title="Issues by label" data={data} colors={colors} />
      <Chart title="Issues by status" data={data} colors={colors} />
      <Chart title="Personal progress" data={data} colors={colors} />
    </Container>
  );
};
