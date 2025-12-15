import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, type SelectChangeEvent } from '@mui/material';

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
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/tasks');
      const data = await response.json();
      setTaskData(data);
    };

    fetchData();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleDelete = async (deletedTask: Task) => {
    await fetch((`http://localhost:3000/tasks/${deletedTask.id}`), {
      method: 'DELETE'
    });
  };


  const handleEdit = async (updatedTask: Task) => {
    setEditingTaskId(updatedTask.id);
    setTask(updatedTask);
    /*
    await fetch(`http://localhost:3000/tasks/${updatedTask.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ...taskData,
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
        dueDate: updatedTask.dueDate
      })
    });
    */
  };

  /*
  const handleSubmit = async (editingTaskId: any) => {
    await fetch(`http://localhost:3000/tasks/${editingTaskId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        

      )
    });
  };

  */
  const handleUpdatedTask = (event: any) => {
    //setTask(...task, [event?.target.name]: event.target.value);
  };

  return (
    <>
      {taskData.map((taskItem) => (
        <Grid container spacing={2} key={taskItem.id}>
          <Grid size={1}>
            <Stack>
              <IconButton aria-label="delete" onClick={() => { /*handleDelete(task)*/ }}>
                <DeleteIcon className='icon-buttons' />
              </IconButton>

              <IconButton aria-label="edit" onClick={() => {
                setTask(task);
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
            <Item>{taskItem.status}</Item>
          </Grid>

          <Grid size={2}>
            <Item>{taskItem.dueDate}</Item>
          </Grid>

          {showEditForm && (
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
                  {task.title}
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
                  {task.description}
                </TextField>

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
                  id='outlined-basic'
                  label='Due Date'
                  name='dueDate'
                  value={task.dueDate}
                  onChange={handleUpdatedTask}
                >
                  {task.description}
                </TextField>

                <Button
                  variant='contained'
                  onClick={() => {/*handleSubmit(editingTaskId)*/}}
                >
                  Done
                </Button>

                <Button
                  variant='contained'
                  onClick={() => {setEditingTaskId(null)}} 
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