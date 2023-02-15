import styled from 'styled-components';

const Container = styled.span`
  color: ${(props) => props.color};
`;

type Props = {
  priority: string;
};

export const IssuePriority = ({ priority }: Props) => {
  let priorityColor = 'var(--black)';
  if (priority === 'high') {
    priorityColor = 'var(--red)';
  } else if (priority === 'medium') {
    priorityColor = 'var(--orange)';
  } else if (priority === 'low') {
    priorityColor = 'var(--yellow)';
  }

  return <Container color={priorityColor}>{priority}</Container>;
};
