import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  border: 2px solid var(--black);
  border-radius: 4px;
`;

const ProgressDiv = styled.div<any>`
  width: ${(props) => (props.width ? props.width : 0)}%;
  height: 12px;
  background-color: var(--green);
`;

type Props = {
  percentage: number;
};

export const MilestoneProgressBar = ({ percentage }: Props) => {
  const roundedPercentage = Math.round(percentage);

  return (
    <Container>
      <ProgressDiv width={roundedPercentage} />
    </Container>
  );
};
