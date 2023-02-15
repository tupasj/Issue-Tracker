import styled from 'styled-components';

const Container = styled.span`
  padding: 8px;
  margin-right: 4px;
  margin-left: 4px;
  border-radius: 14px;
  font-size: 0.75rem;
  background-color: ${(props) => props.color};
  color: var(--black);
`;

type Props = {
  name: string;
  color: string;
};

export const Label = ({ name, color }: Props) => {
  return <Container color={color}>{name}</Container>;
};
