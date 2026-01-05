import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import '../../assets/icons/add-icon.png';

import './AddTaskButton.css';
import { DialogComponent } from '../dialog-component/DialogComponent';

import type { AddTaskButtonProps } from '../../../public/props/AddTaskButtonProps.ts';

export function AddTaskButton({ refreshTasks }: AddTaskButtonProps) {
  const [open, setOpen] = useState(false);

  const handleShowModal = async () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack direction="row" spacing={0.5}>
        <IconButton sx={{ height: 56 }} className='add-task-button' aria-label="add" onClick={() => {
          handleShowModal();
        }}>
          <AddIcon className='add-task-button-icon' /> <span className='add-task-button-text'>Add Task</span>
        </IconButton>
      </Stack>

      <DialogComponent
        refreshTasks={refreshTasks} 
        id='Add Task'
        open={open}
        onClose={handleCloseModal}
        taskToEdit={null}
      />


    </>
  );
}