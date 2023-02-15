import styled from 'styled-components';

const Container = styled.button<any>`
  padding: 6px;
  width: 150px;
  border-radius: 4px;
  background-color: ${(props) => (props.color ? props.color : 'var(--green)')};
  color: var(--white);
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: transform 200ms;
  float: ${(props) => (props.right ? 'right' : 'none')};
  &:hover {
    background-color: ${(props) => (props.hoverColor ? props.hoverColor : 'var(--dark-green)')};
  }
`;

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
  hoverColor?: string;
  right?: boolean;
};

export const Button = ({ onClick, children, color, hoverColor, right }: Props) => {
  return (
    <Container onClick={onClick} color={color} hoverColor={hoverColor} right={right}>
      {children}
    </Container>
  );
};
