const getUserStatusColor = (status: string) => {
  if (status === 'offline') {
    return 'var(--white)';
  } else if (status === 'online') {
    return 'var(--green)';
  } else if (status === 'idle') {
    return 'var(--yellow)';
  } else {
    return 'var(--red)';
  }
};

export { getUserStatusColor };
