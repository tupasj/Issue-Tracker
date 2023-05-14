import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
  position: relative;
`;

const TooltipContainer = styled.div`
  position: absolute;
  padding: 4px;
  color: white;
  background-color: var(--medium-gray);
  cursor: text;
  z-index: 1;
  border-radius: 4px;
`;

type Props = {
  text: string;
  additionalText?: string;
  children: React.ReactNode;
};

export const TooltipWrapper = ({ text, additionalText, children }: Props) => {
  const [hoverActive, setHoverActive] = useState(false);

  return (
    <Container onMouseOver={() => setHoverActive(true)} onMouseLeave={() => setHoverActive(false)}>
      {children}
      {hoverActive && (
        <TooltipContainer>
          <div>{text}</div>
          <div>{additionalText}</div>
        </TooltipContainer>
      )}
    </Container>
  );
};
