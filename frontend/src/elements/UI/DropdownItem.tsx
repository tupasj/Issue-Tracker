import styled from 'styled-components';

const DropDownItemContainer = styled.div<DropDownItemProps>`
  white-space: nowrap;
  padding-top: 4px;
  padding-bottom: 4px;
  cursor: ${(props) => (props.clickable ? 'pointer' : 'text')};
  &:hover {
    text-decoration: ${(props) => (props.clickable ? 'underline' : 'none')};
  }
`;

type DropDownItemProps = {
  children: React.ReactNode;
  clickable: boolean;
  onClickHandler?: () => void;
};

export const DropDownItem = ({ children, clickable, onClickHandler }: DropDownItemProps) => {
  return (
    <DropDownItemContainer clickable={clickable} onClick={onClickHandler}>
      {children}
    </DropDownItemContainer>
  );
};
