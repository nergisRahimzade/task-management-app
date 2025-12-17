import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Box, Button, Stack, TextField } from '@mui/material';

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
  id: any;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

//isonfetch

export function TaskComponents() {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: '',
    dueDate: ''
  });


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

  const handleStatusChange = async (taskItem: Task, newStatus: string) => {
    //update backend
    await fetch(`http://localhost:3000/tasks/${taskItem.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...taskItem,
        status: newStatus
      })
    });

  };

  const handleEdit = async (updatedTask: Task) => {
    setEditingTaskId(updatedTask.id);
    setTask(updatedTask);
    setShowEditForm(true);
  };

  const handleSubmit = async (editingTaskId: any) => {
    await fetch(`http://localhost:3000/tasks/${editingTaskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editingTaskId,
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate
      }
      )
    });

    setEditingTaskId(null);
    setShowEditForm(false);
  };

  const handleUpdatedTask = (event: any) => {
    setTask({ ...task, [event?.target.name]: event.target.value });
  };

  return (
    <>
      {taskData.map((taskItem) => (
        <Grid container spacing={2} key={taskItem.id}>
          <Grid size={1}>
            <Stack>
              <IconButton aria-label="delete" onClick={() => { handleDelete(taskItem) }}>
                <DeleteIcon className='icon-buttons' />
              </IconButton>

              <IconButton aria-label="edit" onClick={() => {
                setShowEditForm(true);
                handleEdit(taskItem);
              }}>
                <EditIcon className='icon-buttons' />
              </IconButton>
            </Stack>

          </Grid>
          <Grid size={1.5}>
            <Item>{taskItem.title}</Item>
          </Grid>

          <Grid size={4}>
            <Item>{taskItem.description}</Item>
          </Grid>

          <Grid size={2}>
            <Item>
              <select
                id='status'
                name='status'
                value={taskItem.status}
                onChange={(event) => handleStatusChange(taskItem, event.target.value)}
              >
                <option value=''>Select</option>
                <option value='TD'>TD</option>
                <option value='IP'>IP</option>
                <option value='D'>D</option>
              </select>
            </Item>
          </Grid>

          <Grid size={2}>
            <Item>{taskItem.dueDate}</Item>
          </Grid>

          {(showEditForm && editingTaskId === taskItem.id) && (
            <>
              <Box
                component='form'
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete='off'
              >

                <TextField
                  id="outlined-basic"
                  label="Title"
                  name='title'
                  value={task.title}
                  onChange={handleUpdatedTask}
                >
                </TextField>

                <TextField
                  id='outlined-multiline-static'
                  label='Description'
                  name='description'
                  value={task.description}
                  multiline
                  rows={5}
                  onChange={handleUpdatedTask}
                >
                </TextField>

                <TextField
                  id='outlined-basic'
                  label='Due Date'
                  name='dueDate'
                  value={task.dueDate}
                  onChange={handleUpdatedTask}
                >
                </TextField>

                <Button
                  variant='contained'
                  onClick={() => { handleSubmit(editingTaskId) }}
                >
                  Done
                </Button>

                <Button
                  variant='contained'
                  onClick={() => { setEditingTaskId(null) }}
                >
                  Cancel
                </Button>
              </Box>
            </>
          )}
        </Grid>

      ))}

    </>
  );
}