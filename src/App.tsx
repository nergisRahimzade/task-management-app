import './App.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { AddTaskButton } from './components/add-task-button/AddTaskButton.tsx';
import { TaskComponents } from './components/task-components/TaskComponents.tsx';

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
  dueDate: string
}

function App() {
  const [taskData, setTaskData] = useState<Task[]>([]);

  const refreshTasks = async () => {
    const response = await fetch('http://localhost:3000/tasks');
    const data = await response.json();
    setTaskData(data);
  };

  useEffect(() => {
    refreshTasks();
  }, []);


  return (
    <div className='container'>
      <Item className='add-task-button'>
        <AddTaskButton refreshTasks={refreshTasks} />
      </Item>

      
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
        </div>

        <TaskComponents refreshTasks={refreshTasks} taskData={taskData} setTaskData={setTaskData} />

      

    </div>
  )
}

export default App
