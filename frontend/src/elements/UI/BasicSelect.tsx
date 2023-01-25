import styled from 'styled-components';
import * as React from 'react';
import { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const StyledFormControl = styled(FormControl)`
  margin: 0 !important;
`;

type Props = {
  priority: string;
  setPriority: React.Dispatch<React.SetStateAction<string>>;
  items: string[];
};

export const BasicSelect = ({ priority, setPriority, items }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value);
  };

  useEffect(() => {
    console.log('priority: ', priority);
  }, [priority]);

  return (
    <StyledFormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select
        labelId="priority"
        id="priority"
        value={priority}
        label="priority"
        onChange={handleChange}
      >
        {items.map((item) => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};
