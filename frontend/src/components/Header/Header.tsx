export const sum = (...numbers: number[]) => {
  return numbers.reduce((total, number) => total + number, 0);
};

export const Header = () => {
  return (
    <>
      <p>Header</p>
    </>
  );
};
