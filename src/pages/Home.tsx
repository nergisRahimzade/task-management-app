import './Home.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { AddTaskButton } from '../components/add-task-button/AddTaskButton.tsx';
import { TaskComponents } from '../components/task-components/TaskComponents.tsx';
import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material';

import type { Task } from '../../public/typeTask.ts';
import { fethcedParsedTasks } from '../services/fetchTasks.ts';

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

export function Home() {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [chosenStatus, setChosenStatus] = useState('');

  const handleChange = (event:  SelectChangeEvent) => {
    setChosenStatus(event.target.value);
    refreshTasks();
  };

  const refreshTasks = async () => {
    const parsedData = await fethcedParsedTasks();
    setTaskData(parsedData);
  };

  useEffect(() => {
    refreshTasks();
  }, []);


  return (
    <div className='container'>
      <div className='button-filter-container'>
        <Item className='add-task-button'>
          <AddTaskButton refreshTasks={refreshTasks} />
        </Item>

        <Item className='filter-task-component'>
          <FormControl sx={{ mindWidth: 120 }}>
            <InputLabel id='demo-simple-select-label'>
              Filter By
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={chosenStatus}
              label='Filter By'
              onChange={handleChange}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value=''>None</MenuItem>
              <MenuItem value='TD'>To Do</MenuItem>
              <MenuItem value='IP'>In Progress</MenuItem>
              <MenuItem value='D'>Done</MenuItem>
            </Select>
          </FormControl>
        </Item>
      </div>

      <div className='header-container'> 
        <div className='header-title'>
          Title
        </div>

        <div className='header-description'>
          Description
        </div>

        <div className='header-status'>
          Status
        </div>

        <div className='header-due-date'>
          Due Date
        </div>

        <div className='header-due-date'>
          Actions
        </div>
      </div>

      <TaskComponents 
        refreshTasks={refreshTasks} 
        taskData={taskData} 
        setTaskData={setTaskData} 
        chosenStatus={chosenStatus}
      />

    </div>
  )
}

