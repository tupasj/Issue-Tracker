export const getPriorityColor = (priority: string) => {
  if (priority === 'high') {
    return '#DC2626';
  } else if (priority === 'medium') {
    return '#F97316';
  } else if (priority === 'low') {
    return '#FBBF24';
  } else {
    return '#ffffff';
  }
};

export const convertTimestamp = (timestamp: string) => {
  const formattedTime = timestamp.split('T');
  return formattedTime[0];
};
