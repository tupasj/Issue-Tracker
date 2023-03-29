import styled from 'styled-components';
import { forwardRef, ReactNode } from 'react';

const Button = styled.button`
  visibility: hidden;
`;

export type Ref = HTMLButtonElement;

interface Props {
  children?: ReactNode;
}

export const SubformSubmitButton = forwardRef<Ref, Props>((props, ref) => (
  <Button ref={ref} type="submit" onClick={() => console.log('SubformSubmitButton clicked')}>
    {props.children}
  </Button>
));
