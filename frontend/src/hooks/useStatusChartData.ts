import { useState, useEffect } from 'react';
import { getPercentage } from '@/utils/mathUtils';

export const useStatusChartData = (allIssues: any) => {
  const [labels, setLabels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const labelNames = ['open', 'closed'];
  const colors = ['var(--green)', 'var(--medium-gray)'];

  useEffect(() => {
    // Add name and percentage properties to labels for each labelName
    if (allIssues[0]) {
      const updatedLabels: any[] = [];
      for (let i = 0; i < labelNames.length; i++) {
        const openStatusBool = labelNames[i] === 'open' ? true : false;
        const label: any = {};
        const filteredIssues = allIssues.filter((issue: any) => issue.is_open === openStatusBool);
        const labelPercentage = getPercentage(filteredIssues.length, allIssues.length);
        label.name = labelNames[i];
        label.value = labelPercentage;
        updatedLabels.push(label);
      }
      setLabels(updatedLabels);
    }
  }, [allIssues]);

  useEffect(() => {
    if (labels[0] && labels.some((label) => !isNaN(label.value))) {
      setIsLoading(false);
    }
  }, [labels]);

  return { labels, colors, isLoading };
};
