import styled from 'styled-components';

const Container = styled.button<any>`
  padding: 6px;
  width: 150px;
  border-radius: 4px;
  background-color: var(--green);
  color: var(--white);
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: transform 200ms;
  float: ${(props) => (props.right ? 'right' : 'none')};
  &:hover {
    background-color: var(--dark-green);
  }
`;

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  right?: boolean;
};

export const Button = ({ onClick, children, right }: Props) => {
  return (
    <Container onClick={onClick} right={right}>
      {children}
    </Container>
  );
};
