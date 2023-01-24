import styled from 'styled-components';

const Container = styled.div`
  width: 4px;
  background-color: ${(props) => props.color};
`;

type Props = {
  priority: string;
};

export const IssuePriority = ({ priority }: Props) => {
  // case

  // pass in hex value
  return <Container />;
};
