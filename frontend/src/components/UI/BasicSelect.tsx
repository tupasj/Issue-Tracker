import styled from 'styled-components';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const StyledFormControl = styled(FormControl)`
  margin: 0 !important;
`;

type SelectMilestonesProps = {
  label: string;
  items: any[];
  defaultState: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

const SelectMilestones = ({ label, items, defaultState, setState }: SelectMilestonesProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };

  return (
    <Select labelId={label} id={label} value={defaultState} label={label} onChange={handleChange}>
      {items.map((item: any) => (
        <MenuItem key={item.id} value={item}>
          {item.title}
        </MenuItem>
      ))}
    </Select>
  );
};

type Props = {
  label: string;
  items: string[] | any[];
  defaultState: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  milestones?: boolean;
};

export const BasicSelect = ({ label, items, defaultState, setState, milestones }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };

  return (
    <StyledFormControl sx={{ m: 1, width: 120 }} size="small">
      <InputLabel id={label}>...</InputLabel>
      {milestones ? (
        <SelectMilestones
          label={label}
          items={items}
          defaultState={defaultState}
          setState={setState}
        />
      ) : (
        <Select
          labelId={label}
          id={label}
          value={defaultState}
          label={label}
          onChange={handleChange}
        >
          {items.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      )}
    </StyledFormControl>
  );
};
