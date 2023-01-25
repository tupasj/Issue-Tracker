import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.span``;

const Tooltip = styled.span`
  position: absolute;
  top: 25px;
  left: 22px;
  color: white;
  background-color: black;
  cursor: text;
`;

type Props = {
  text: string;
  children: React.ReactNode;
};

export const TooltipWrapper = ({ text, children }: Props) => {
  const [hoverActive, setHoverActive] = useState(false);
  const overflowLength = 23;

  return (
    <Container onMouseOver={() => setHoverActive(true)} onMouseLeave={() => setHoverActive(false)}>
      {children}
      {hoverActive && text.length >= overflowLength && <Tooltip>{text}</Tooltip>}
    </Container>
  );
};
