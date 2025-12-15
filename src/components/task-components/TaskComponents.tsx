import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import { TaskChangeButtons } from '../task-change-buttons/TaskChangeButtons';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

// Define the type for your task
interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

export function TaskComponents() {
  const [taskData, setTaskData] = useState<Task[]>([]);

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
      {taskData.map((task) => (
        <Grid container spacing={2} key={task.id}>
          <Grid size={1}>
            <TaskChangeButtons />
          </Grid>
          <Grid size={1.5}>
            <Item>{task.title}</Item>
          </Grid>

          <Grid size={4}>
            <Item>{task.description}</Item>
          </Grid>

          <Grid size={2}>
            <Item>{task.status}</Item>
          </Grid>

          <Grid size={2}>
            <Item>{task.dueDate}</Item>
          </Grid>
        </Grid>

      ))}

    </>
  );
}