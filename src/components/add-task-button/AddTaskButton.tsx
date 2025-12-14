import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import './AddTaskButton.css';

export function AddTaskButton() {
  return (
    <>
      <Stack direction="row" spacing={0.5}>
        <IconButton aria-label="add">
          <AddIcon className='add-task-button-icon' /> <span className='add-task-button-text'>Add Task</span>
        </IconButton>
      </Stack>
    </>
  );
}