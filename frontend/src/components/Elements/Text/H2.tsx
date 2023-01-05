import styled from 'styled-components';

const Container = styled.h2`
  padding-top: 22px;
  font-weight: 600;
`;

type Props = {
  children: React.ReactNode;
};

export const H2 = ({ children }: Props) => {
  return <Container>{children}</Container>;
};
