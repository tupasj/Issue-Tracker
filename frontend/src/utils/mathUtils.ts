const getPercentage = (numerator: number, denominator: number) => {
  const decimalValue = numerator / denominator;
  const percentage = decimalValue * 100;
  return Math.round(percentage);
};

export { getPercentage };
