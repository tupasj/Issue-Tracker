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
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DropdownItem = ({
  children,
  clickable,
  onClickHandler,
  setModalOpen,
}: DropDownItemProps) => {
  if (setModalOpen) {
    return (
      <DropDownItemContainer clickable={clickable} onClick={() => setModalOpen(true)}>
        {children}
      </DropDownItemContainer>
    );
  } else {
    return (
      <DropDownItemContainer clickable={clickable} onClick={onClickHandler}>
        {children}
      </DropDownItemContainer>
    );
  }
};
