import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import './TaskChangeButtons.css';

export function TaskChangeButtons() {
  return (
    <>
      <Stack direction="row" spacing={0.5}>
        <IconButton aria-label="delete">
          <DeleteIcon className='icon-buttons' />
        </IconButton>

        <IconButton aria-label="edit">
          <EditIcon className='icon-buttons' />
        </IconButton>
      </Stack>
    </>
  );
}