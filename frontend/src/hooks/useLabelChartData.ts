import { useState, useEffect } from 'react';
import { makeColorsArray } from '@/utils/chartUtils';
import { getPercentage } from '@/utils/mathUtils';

export const useLabelChartData = (allIssues: any) => {
  const [labels, setLabels] = useState<any[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //   Push every label in an issue to a labels array
    if (allIssues) {
      const labelNames: string[] = [];
      for (let i = 0; i < allIssues.length; i++) {
        for (let j = 0; j < allIssues[i].labels.length; j++) {
          if (allIssues[i].labels[j]) {
            labelNames.push(allIssues[i].labels[j].name);
          }
        }
      }

      //   Make a 'counts' object where each property is the labelName, and the property value a number representing the amount of times it appears in the labelNames array
      const counts: any = {};
      for (const name of labelNames) {
        //   If label name not in array, add it in with a count value of 1. If label name is already in array, then increment its count by 1.
        if (counts[name]) {
          counts[name]++;
        } else if (!counts[name]) {
          counts[name] = 1;
        }
      }

      //   Remove duplicates from labelNames array
      const uniqueLabelNames = [...new Set(labelNames)];

      const labelCounts: number[] = [];
      for (const num in counts) {
        labelCounts.push(counts[num]);
      }
      //   Make the labels array
      const updatedLabels: any = [];
      for (let i = 0; i < uniqueLabelNames.length; i++) {
        const label: any = {};
        label.name = uniqueLabelNames[i];
        label.value = getPercentage(labelCounts[i], labelNames.length);
        updatedLabels.push(label);
      }

      setLabels(updatedLabels);
      setColors(makeColorsArray(uniqueLabelNames));
    }
  }, [allIssues]);

  useEffect(() => {
    if (labels[0] && colors[0]) {
      setIsLoading(false);
    }
  }, [labels]);

  return { labels, colors, isLoading };
};
