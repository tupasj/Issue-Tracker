import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { usePriorityChartData, useLabelChartData, useStatusChartData } from '@/hooks';
import { projectsContext, userContext } from '@/context';
import { Chart } from './Chart';
import { getIssues, getUserIssues } from '@/features/issues';
import { NoIssuesNotification } from './NoIssuesNotification';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 90%;
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
  const { email, displayName, profileImage, status, type } = userContext();

  useEffect(() => {
    const fetchIssues = async () => {
      const issues = await getIssues(currentProject);
      setAllIssues(issues);
      setIssuesLoading(false);
    };
    const fetchUserIssues = async () => {
      const userIssues = await getUserIssues(email);
      setUserIssues(userIssues);
      setIssuesLoading(false);
    };

    if (currentProject) {
      fetchIssues();
      fetchUserIssues();
    }
  }, [currentProject]);

  // useEffect(() => {
  //   if (allIssues) {
  //     console.log('allIssues: ', allIssues);
  //   }
  // }, [allIssues]);

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
