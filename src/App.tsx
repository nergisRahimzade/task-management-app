import './App.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { AddTaskButton } from './components/add-task-button/AddTaskButton.tsx';
import { TaskComponents } from './components/task-components/TaskComponents.tsx';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material';

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

interface Task {
  id: string,
  title: string,
  description: string,
  status: string,
  dueDate: Dayjs | null
}

function App() {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [chosenStatus, setChosenStatus] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setChosenStatus(event.target.value);
    refreshTasks();
  };

  const refreshTasks = async () => {
    const response = await fetch('http://localhost:3000/tasks');
    const data = await response.json();

    const parsedData = data.map((task: Task) => (
      {
        ...task,
        dueDate: task.dueDate ? dayjs(task.dueDate) : null
      }));

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

export default App
