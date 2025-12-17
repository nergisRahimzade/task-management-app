import { useState, useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';

import './AddTaskButton.css';

interface AddTaskButtonProps {
  refreshTasks: () => Promise<void>
}

export function AddTaskButton({ refreshTasks }: AddTaskButtonProps) {
  const dialogElement = useRef<HTMLDialogElement>(null);
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: '',
    dueDate: ''
  });
  const BASE_URL = "http://localhost:3000";

  const handleNewTask = (event: any) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  const handleShowModal = () => {
    if (dialogElement.current)
      dialogElement.current.showModal();
  };

  const handleCloseModal = () => {
    if (dialogElement.current)
      dialogElement.current.close();
  };

  const handleCancel = () => {
    setTask({ title: '', description: '', status: '', dueDate: '' });
    handleCloseModal();
    refreshTasks();
  }


  const handleSubmit = async () => {
    await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate
      })
    });

    setTask({ title: '', description: '', status: '', dueDate: '' });
    refreshTasks();
    //handleCloseModal();
    if(dialogElement.current)
      dialogElement.current.close();
  }

  return (
    <>
      <Stack direction="row" spacing={0.5}>
        <IconButton aria-label="add" onClick={() => {
          handleShowModal();
        }}>
          <AddIcon className='add-task-button-icon' /> <span className='add-task-button-text'>Add Task</span>
        </IconButton>
      </Stack>

      <dialog ref={dialogElement} className='add-task-dialog' id='add-task-dialog'>
        <TextField
          className='add-task-dialog-component'
          id="outlined-basic"
          label='Title'
          name='title'
          value={task.title}
          onChange={handleNewTask}
        />

        <TextField
          className='add-task-dialog-component'
          id="outlined-multiline-static"
          label='Description'
          name='description'
          value={task.description}
          onChange={handleNewTask}
          multiline
          rows={5}
        />

        <select
          className='add-task-dialog-component-select'
          id='status'
          name='status'
          value={task.status}
          onChange={(event) => {
            handleNewTask(event);
          }}>
          <option value=''>Select</option>
          <option value='TD'>TD</option>
          <option value='IP'>IP</option>
          <option value='D'>D</option>
        </select>

        <TextField
          className='add-task-dialog-component'
          id="outlined-basic"
          label='Due Date'
          name='dueDate'
          value={task.dueDate}
          onChange={handleNewTask}
        />

        <Button
          className='add-task-dialog-component-done-button'
          variant="contained"
          onClick={async () => {
            await handleSubmit();
          }}
        >
          Done
        </Button>

        <Button
          className='add-task-dialog-component-cancel-button'
          variant='contained'
          onClick={() => { handleCancel() }}
        >
          Cancel
        </Button>
      </dialog>

    </>
  );
}