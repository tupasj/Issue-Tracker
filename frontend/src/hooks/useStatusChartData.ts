import { useState, useEffect } from 'react';
import { getPercentage } from '@/utils/mathUtils';

export const useStatusChartData = (issues: any) => {
  const [labels, setLabels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const labelNames = ['open', 'closed'];
  const colors = ['var(--green)', 'var(--medium-gray)'];

  useEffect(() => {
    // Add name and percentage properties to labels for each labelName
    if (issues[0]) {
      const updatedLabels: any[] = [];
      for (let i = 0; i < labelNames.length; i++) {
        const openStatusBool = labelNames[i] === 'open' ? true : false;
        const label: any = {};
        const filteredIssues = issues.filter((issue: any) => issue.is_open === openStatusBool);
        const labelPercentage = getPercentage(filteredIssues.length, issues.length);
        label.name = labelNames[i];
        label.value = labelPercentage;
        updatedLabels.push(label);
      }
      setLabels(updatedLabels);
    }
  }, [issues]);

  useEffect(() => {
    if (labels[0] && labels.some((label) => !isNaN(label.value))) {
      setIsLoading(false);
    }
  }, [labels]);

  return { labels, colors, isLoading };
};
