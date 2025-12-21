import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import type { Dayjs } from 'dayjs';

interface Task {
  id: string,
  title: string,
  description: string,
  status: string,
  dueDate: Dayjs | null
}

interface FilterTaskComponentProps {
  refreshTasks: () => Promise<void>,
  taskData: Task[]
}

export function FilterTaskComponent({ refreshTasks, taskData }: FilterTaskComponentProps) {
  const [chosenStatus, setChosenStatus] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setChosenStatus(event.target.value);
    

    refreshTasks();
  };

  return (
    <>
      <FormControl sx={{ mindWidth: 120 }}>
        <InputLabel id='demo-simple-select-label'>
          Filter By
        </InputLabel>
        <Select 
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={chosenStatus}
            label='Filter By'
            onChange={handleChange}
            sx={{minWidth: 120}}
          >
            <MenuItem value='TD'>To Do</MenuItem>
            <MenuItem value='IP'>In Progress</MenuItem>
            <MenuItem value='D'>Done</MenuItem>
          </Select>
      </FormControl>
    </>
  );
}