import styled from 'styled-components';

const Container = styled.div`
  margin: 2px;
  color: red;
`;

type Props = {
  children: React.ReactNode;
};

const ErrorMessageText = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export { ErrorMessageText };
