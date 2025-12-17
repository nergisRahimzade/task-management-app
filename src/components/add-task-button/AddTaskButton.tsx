import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';

import './AddTaskButton.css';

export function AddTaskButton() {
  const [showForm, setShowForm] = useState(false);
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: '',
    dueDate: ''
  });
  const BASE_URL = "http://localhost:3000";

  const [flag, setFlag] = useState(false);

  const handleNewTask = (event: any) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  useEffect(() => {
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
    };

    handleSubmit();

    setShowForm(false);
    setTask({ title: '', description: '', status: '', dueDate: '' });
  }, [flag]);

  return (
    <>
      <Stack direction="row" spacing={0.5}>
        <IconButton aria-label="add" onClick={() => { setShowForm(true) }}>
          <AddIcon className='add-task-button-icon' /> <span className='add-task-button-text'>Add Task</span>
        </IconButton>
      </Stack>

      {showForm && (
        <Box
          component='form'
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete='off'
        >
          <TextField
            id="outlined-basic"
            label='Title'
            name='title'
            value={task.title}
            onChange={handleNewTask}
          />

          <TextField
            id="outlined-multiline-static"
            label='Description'
            name='description'
            value={task.description}
            onChange={handleNewTask}
            multiline
            rows={5}
          />

          <select
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
            id="outlined-basic"
            label='Due Date'
            name='dueDate'
            value={task.dueDate}
            onChange={handleNewTask}
          />

          <Button
            variant="contained"
            onClick={() => setFlag(!flag)}
          >
            Done
          </Button>
        </Box>
      )}
    </>
  );
}