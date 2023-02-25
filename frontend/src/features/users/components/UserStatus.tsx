import styled from 'styled-components';

const Container = styled.div`
  color: ${(props) => props.color};
`;

type Props = {
  status: string;
};

export const UserStatus = ({ status }: Props) => {
  let statusColor = 'var(--black)';
  if (status === 'online') {
    statusColor = 'var(--green)';
  } else if (status === 'offline') {
    statusColor = 'var(--medium-gray)';
  } else if (status === 'away') {
    statusColor === 'var(--yellow)';
  }

  return <Container color={statusColor} />;
};
