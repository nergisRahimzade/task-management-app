import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { taskService } from '../../services/taskService.ts';
import type { TaskActionButtonsProps } from '../../types/index.ts';
import { useState } from 'react';
import type { Task } from '../../types/task.ts';

export function TaskActionButtons({ setTaskToEdit, setOpen, taskItem, refreshTasks }: TaskActionButtonsProps) {
  const [hasError, setHasError] = useState(false);

  const handleDelete = async () => {
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

  //this function indicates that "we will editing an existing task" by
  //since we are editing an existing task, the task to edit will be our current task's values &
  //we will be opening dialog by setOpen(). 
  //actual editing to backend is done in TaskDialog.
  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
    setOpen(true);
  };

  return (
    <>

      <Stack direction="row" spacing={1} className='task-change-buttons-container'>
        <IconButton
          aria-label="delete task button"
          className='task-change-buttons-delete'
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>

        <IconButton
          aria-label="edit task button"
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