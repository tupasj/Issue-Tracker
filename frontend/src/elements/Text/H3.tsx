import styled from 'styled-components';

const Container = styled.h3`
  font-style: italic;
`;

type Props = {
  children: React.ReactNode;
};

export const H3 = ({ children }: Props) => {
  return <Container>{children}</Container>;
};
