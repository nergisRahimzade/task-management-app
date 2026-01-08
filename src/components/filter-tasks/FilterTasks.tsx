import { FormControl, IconButton, InputLabel, MenuItem, Select, Stack, type SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import { DialogComponent } from '../dialog-component/DialogComponent';
import { useState } from 'react';
import type { FilterTasksProps } from '../../../public/props/FilterTasksProps.ts';
import './FilterTasks.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f0f0f0ff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export function FilterTasks({ refreshTasks, chosenStatus, setChosenStatus }: FilterTasksProps) {
  const [open, setOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setChosenStatus(event.target.value);
    refreshTasks();
  };


  return (
    <>
      <div className='button-filter-container'>
        <Item className='add-task-button'>
          <Stack direction="row" spacing={0.5}>
            <IconButton sx={{ height: 56 }} className='add-task-button' aria-label="add" onClick={() => {
              setOpen(true);
            }}>
              <AddIcon className='add-task-button-icon' /> <span className='add-task-button-text'>Add Task</span>
            </IconButton>
          </Stack>

          <DialogComponent
            refreshTasks={refreshTasks}
            id='Add Task'
            open={open}
            onClose={() => setOpen(false)}
            taskToEdit={null}
          />
        </Item>

        <Item className='filter-task-component'>
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
              sx={{ minWidth: 120 }}
            >
              <MenuItem value=''>None</MenuItem>
              <MenuItem value='TD'>To Do</MenuItem>
              <MenuItem value='IP'>In Progress</MenuItem>
              <MenuItem value='D'>Done</MenuItem>
            </Select>
          </FormControl>
        </Item>
      </div>
    </>
  );
}
