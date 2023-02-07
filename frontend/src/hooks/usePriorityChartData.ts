import { getPercentage } from '@/utils/mathUtils';

export const usePriorityChartData = (allIssues: any) => {
  const labelNames = ['none', 'high', 'medium', 'low'];
  const colors = ['var(--medium-gray)', 'var(--red)', 'var(--orange)', 'var(--yellow)'];

  // Add name and percentage properties to labels for each labelName
  const labels = [];
  for (let i = 0; i < labelNames.length; i++) {
    const label: any = {};
    const filteredIssues = allIssues.filter((issue: any) => issue.priority === labelNames[i]);
    const labelPercentage = getPercentage(filteredIssues.length, allIssues.length);
    label.name = labelNames[i];
    label.value = labelPercentage;
    labels.push(label);
  }

  console.log('labels: ', labels);

  return { labels, colors };
};
