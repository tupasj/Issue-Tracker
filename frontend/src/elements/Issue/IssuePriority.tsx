import styled from 'styled-components';

const Container = styled.span`
  color: ${(props) => props.color};
`;

type Props = {
  priority: string;
};

export const IssuePriority = ({ priority }: Props) => {
  let priorityColor = '#fff';
  if (priority === 'high') {
    priorityColor = '#DC2626';
  } else if (priority === 'medium') {
    priorityColor = '#F97316';
  } else if (priority === 'low') {
    priorityColor = '#FBBF24';
  }

  return <Container color={priorityColor}>{priority}</Container>;
};
