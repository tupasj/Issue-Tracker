import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { IssueOptionItems } from './IssueOptionItems';

const Option = styled.div`
  padding-bottom: 8px;
  color: var(--medium-gray);
`;

const OptionContent = styled.div`
  padding-bottom: 22px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: var(--medium-gray);
  cursor: pointer;
  &:hover {
    color: var(--black);
  }
`;

type Props = {
  title: string;
  emptyTextPlaceholder: string;
  children: React.ReactNode;
  handleSubmit?: (...params: any) => Promise<void>;
  changes: any;
  labels?: any[];
  assignees?: any[];
  setState?: React.Dispatch<React.SetStateAction<any>>;
};

export const IssueOptionBlock = ({
  title,
  emptyTextPlaceholder,
  children,
  handleSubmit,
  changes,
  labels,
  assignees,
  setState,
}: Props) => {
  const [editingActive, setEditingActive] = useState(false);

  const startEdit = () => {
    if (assignees) {
      setState!([]);
    }
    setEditingActive(true);
  };

  const confirmChanges = (changes: any) => {
    console.log('changes: ', changes);
    handleSubmit?.(changes);
    setEditingActive(false);
  };

  return (
    <>
      <FlexContainer>
        <Option>{title}</Option>
        {editingActive ? (
          <StyledFontAwesomeIcon icon={faCheck} onClick={() => confirmChanges(changes)} />
        ) : (
          <StyledFontAwesomeIcon icon={faPenToSquare} onClick={startEdit} />
        )}
      </FlexContainer>
      <>
        {editingActive ? (
          children
        ) : (
          <OptionContent>
            <IssueOptionItems
              title={title}
              emptyTextPlaceholder={emptyTextPlaceholder}
              changes={changes}
              labels={labels}
              assignees={assignees}
            />
          </OptionContent>
        )}
      </>
    </>
  );
};
