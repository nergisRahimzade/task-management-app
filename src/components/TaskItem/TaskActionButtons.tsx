import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { taskService } from '../../services/taskService';
import type { TaskActionButtonsProps } from '../../types';
import { useState } from 'react';
import { Alert } from '@mui/material';

export function TaskActionButtons({ handleEdit, taskItem, refreshTasks }: TaskActionButtonsProps) {
  const [hasError, setHasError] = useState(false);

  const handleClick = async () => {
    setHasError(false);
    try {
      await taskService.delete(taskItem.id);
      await refreshTasks();
    } catch (error) {
      console.error('Failed to call API delete(): ', error);
      setHasError(true);
      throw error;
    }
  };

  return (
    <>

      <Stack direction="row" spacing={1} className='task-change-buttons-container'>
        <IconButton
          aria-label="delete"
          className='task-change-buttons-delete'
          onClick={handleClick}
        >
          <DeleteIcon />
        </IconButton>

        <IconButton
          aria-label="edit"
          className='task-change-buttons-delete'
          onClick={() => {
            setHasError(false);
            handleEdit(taskItem)
          }}
        >
          <EditIcon />
        </IconButton>
      </Stack>

      {hasError && (
        <Alert severity='error'>There has been an error in calling API. </Alert>
      )}

    </>
  );
}