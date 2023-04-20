const getUserStatusColor = (status: string) => {
  if (status === 'offline') {
    return 'var(--white)';
  } else if (status === 'available') {
    return 'var(--green)';
  } else if (status === 'away') {
    return 'var(--yellow)';
  } else if (status === 'busy') {
    return 'var(--red)';
  }
};

export { getUserStatusColor };
