import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

import Button from '@mui/material/Button';

import './AddTaskButton.css';

export function AddTaskButton() {
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState('');
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: '',
    dueDate: ''
  });
  const BASE_URL = "http://localhost:3000";

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleNewTask = (event: any) => {
    //use "name" attributes to update state dynamically
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: crypto.randomUUID(),
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate 
      })
    });

     await fetch(`${BASE_URL}/tasks`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    });

    setShowForm(false);
    setTask({ title: '', description: '', status: '', dueDate: ''});
  
  };

  return (
    <>
      <Stack direction="row" spacing={0.5}>
        <IconButton aria-label="add" onClick={() => {setShowForm(true)}}>
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
            defaultValue=""
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value={'TD'}>TD</MenuItem>
              <MenuItem value={'IP'}>IP</MenuItem>
              <MenuItem value={'D'}>D</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="outlined-basic"
            label='Due Date'
            name='dueDate'
            value={task.dueDate}
            onChange={handleNewTask}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Done
          </Button>
        </Box>
      )}
    </>
  );
}