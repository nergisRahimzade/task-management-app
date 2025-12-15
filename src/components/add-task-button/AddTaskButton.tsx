import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

import './AddTaskButton.css';

export function AddTaskButton() {
  const [status, setStatus] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const [task, setTask] = useState(null);

  const BASE_URL = "https://localhost:3000";

  useEffect(async (event) => {
    const newTask = event.target.value;

    await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        dueDate: newTask.dueDate
      })
    });
  }, [task]);

  const handleClick = () => {
    const [newTask, setNewTask] = useState('');

    return (
      <>
        <Box
          component='form'
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete='off'
        >
          <TextField
            id="outlined-basic"
            label='Title'
          />

          <TextField
            id="outlined-multiline-static"
            label='Description'
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
          />
        </Box>
      </>
    );
  };

  return (
    <>
      <Stack direction="row" spacing={0.5}>
        <IconButton aria-label="add" onClick={handleClick}>
          <AddIcon className='add-task-button-icon' /> <span className='add-task-button-text'>Add Task</span>
        </IconButton>
      </Stack>
    </>
  );
}