import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/material';

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

  const handleDelete = async (deletedTask: Task) => {
    await fetch((`http://localhost:3000/tasks/${deletedTask.id}`), {
      method: 'DELETE'
    });
  };


  const handleEdit = async (updatedTask: Task) => {
    await fetch(`http://localhost:3000/${updatedTask.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application-json'},
      body: JSON.stringify({
        ...taskData,
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
        dueDate: updatedTask.dueDate
      })
    });
  };


  return (
    <>
      {taskData.map((task) => (
        <Grid container spacing={2} key={task.id}>
          <Grid size={1}>
            <Stack>
              <IconButton aria-label="delete" onClick={() => {handleDelete(task)}}>
                <DeleteIcon className='icon-buttons' />
              </IconButton>

              <IconButton aria-label="edit" onClick={() => {
                handleEdit(task);
              }}>
                <EditIcon className='icon-buttons' />
              </IconButton>
            </Stack>
              
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