import { FormControl, IconButton, InputLabel, MenuItem, Select, Stack, type SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import './TaskFilter.css';

import type { TaskFilterProps } from '../../types/index.ts';
import { useId } from 'react';
import { TASK_STATUS, TASK_STATUS_LABELS } from '../../constants/taskStatus.ts';

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

export function TaskFilter({ chosenStatus, setChosenStatus, setIsEditOn, setTaskToEdit, setOpen }: TaskFilterProps) {
  const selectId = useId();
  const labelId = useId();
  const addButtonId = useId();

  const handleChange = (event: SelectChangeEvent) => {
    setChosenStatus(event.target.value);
  };

  const handleAddButtonClick = () => {
    setIsEditOn(false);
    setTaskToEdit(null);
    setOpen(true);
  }

  return (
    <>
      <div className='button-filter-container'>
        <Item className='add-task-button'>
          <Stack direction="row" spacing={0.5}>
            <IconButton
              id={addButtonId}
              sx={{ height: 56 }}
              className='add-task-button'
              aria-label="add"
              onClick={handleAddButtonClick}
            >
              <AddIcon className='add-task-button-icon' /> <span className='add-task-button-text'>Add Task</span>
            </IconButton>
          </Stack>
        </Item>

        <Item className='filter-task-component'>
          <FormControl sx={{ mindWidth: 120 }}>
            <InputLabel id={labelId}>
              Filter By
            </InputLabel>
            <Select
              labelId={labelId}
              id={selectId}
              value={chosenStatus}
              label='Filter By'
              onChange={handleChange}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value={TASK_STATUS.NULL}>
                {TASK_STATUS_LABELS[TASK_STATUS.NULL]}
              </MenuItem>
              <MenuItem value={TASK_STATUS.IN_PROGRESS}>
                {TASK_STATUS_LABELS[TASK_STATUS.IN_PROGRESS]}
              </MenuItem>
              <MenuItem value={TASK_STATUS.DONE}>
                {TASK_STATUS_LABELS[TASK_STATUS.DONE]}
              </MenuItem>
              <MenuItem value={TASK_STATUS.DONE}>
                {TASK_STATUS_LABELS[TASK_STATUS.DONE]}
              </MenuItem>
            </Select>
          </FormControl>
        </Item>
      </div>
    </>
  );
}
