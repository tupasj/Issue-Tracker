import { useState, useEffect } from 'react';
import { getPercentage } from '@/utils/mathUtils';

export const usePriorityChartData = (allIssues: any) => {
  const [labels, setLabels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const labelNames = ['none', 'high', 'medium', 'low'];
  const colors = ['var(--medium-gray)', 'var(--red)', 'var(--orange)', 'var(--yellow)'];

  useEffect(() => {
    // Add name and percentage properties to labels for each labelName
    if (allIssues[0]) {
      const updatedLabels: any[] = [];
      for (let i = 0; i < labelNames.length; i++) {
        const label: any = {};
        const filteredIssues = allIssues.filter((issue: any) => issue.priority === labelNames[i]);
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
