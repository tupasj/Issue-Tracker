export const getPriorityColor = (priority: string) => {
  if (priority === 'high') {
    return 'var(--red)';
  } else if (priority === 'medium') {
    return 'var(--orange)';
  } else if (priority === 'low') {
    return 'var(--yellow)';
  } else {
    return 'var(--white)';
  }
};

export const convertTimestamp = (timestamp: string) => {
  const formattedTime = timestamp.split('T');
  return formattedTime[0];
};
