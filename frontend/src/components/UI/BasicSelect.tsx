import styled from 'styled-components';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const StyledFormControl = styled(FormControl)`
  margin: 0 !important;
`;

type Props = {
  label: string;
  items: string[];
  defaultState: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

export const BasicSelect = ({ label, items, defaultState, setState }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };

  return (
    <StyledFormControl sx={{ m: 1, width: 120 }} size="small">
      <InputLabel id={label}>...</InputLabel>
      <Select labelId={label} id={label} value={defaultState} label={label} onChange={handleChange}>
        {items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};
