import styled from 'styled-components';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const StyledFormControl = styled(FormControl)`
  margin: 0 !important;
`;

const ITEM_HEIGHT = 48;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5,
      width: 250,
    },
  },
};

type Props = {
  label: string;
  items: string[];
  defaultState: string[];
  setState: React.Dispatch<React.SetStateAction<string[]>>;
};

export const MultiSelect = ({ label, items, defaultState, setState }: Props) => {
  const handleChange = (event: SelectChangeEvent<typeof defaultState>) => {
    const {
      target: { value },
    } = event;
    setState(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <StyledFormControl sx={{ m: 1, width: 120 }} size="small">
      <InputLabel id={label}>...</InputLabel>
      <Select
        labelId={label}
        id={label}
        multiple
        value={defaultState}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected: any) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {items.map((item) => (
          <MenuItem key={item} value={item}>
            <Checkbox checked={defaultState.indexOf(item) > -1} />
            <ListItemText primary={item} />
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};
