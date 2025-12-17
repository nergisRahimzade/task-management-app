import './App.css'
import { TaskGrid } from './components/TaskGrid.tsx';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/tasks');
      const data = await response.json();
      setTaskData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <table>
        <tr>
          <th>
            Title
          </th>

          <th>
            Description
          </th>

          <th>
            Status
          </th>

          <th>
            Due Date
          </th>
        </tr>

        <tr>
          <TaskComponents refreshTasks={refreshTasks} taskData={taskData} setTaskData={setTaskData} />
        </tr>
      </table>
      
    </>
  )
}

export default App
