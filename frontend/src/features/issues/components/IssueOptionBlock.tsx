import styled from 'styled-components';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import { MultiSelect } from '@/components/UI';
import { Label } from '@/elements/Label';

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

const LabelsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

type Props = {
  title: string;
  emptyTextPlaceholder: string;
  handleSubmit?: (...params: any) => Promise<void>;
  multi?: boolean;
  label?: string | any;
  items?: any[] | any;
  itemNames?: string[] | any;
  defaultState?: string[] | any;
  setState?: React.Dispatch<React.SetStateAction<string[]>> | any;
};

export const IssueOptionBlock = ({
  title,
  emptyTextPlaceholder,
  handleSubmit,
  multi,
  label,
  items,
  itemNames,
  defaultState,
  setState,
}: Props) => {
  const [editingActive, setEditingActive] = useState(false);

  const confirmChanges = (labelNames: any) => {
    handleSubmit?.(labelNames);
    setEditingActive(false);
  };

  return (
    <>
      <FlexContainer>
        <Option>{title}</Option>
        {editingActive ? (
          <StyledFontAwesomeIcon icon={faCheck} onClick={() => confirmChanges(defaultState)} />
        ) : (
          <StyledFontAwesomeIcon icon={faPenToSquare} onClick={() => setEditingActive(true)} />
        )}
      </FlexContainer>
      <>
        {editingActive ? (
          <>
            {multi ? (
              <MultiSelect
                label={label}
                items={itemNames}
                defaultState={defaultState}
                setState={setState}
              />
            ) : (
              <p>Basic select</p>
            )}
          </>
        ) : (
          <OptionContent>
            {items && items.length > 0 ? (
              <LabelsContainer>
                {items.map((item: any) => (
                  <Label key={item.name} name={item.name} color={item.color} />
                ))}
              </LabelsContainer>
            ) : (
              <p>{emptyTextPlaceholder}</p>
            )}
          </OptionContent>
        )}
      </>
    </>
  );
};
