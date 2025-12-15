import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import './TaskChangeButtons.css';
import { useState, useEffect } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

// Define the type for your task
interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

export function TaskChangeButtons() {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/tasks');
      const data = await response.json();
      setTaskData(data);
    };

    fetchData();
  }, []);

  /*
  const handleDelete = async (task) => {
    await fetch((`http://localhost:3000/tasks/${task.id}`), {
      method: 'DELETE'
    });
  };
  */

  /*
  const handleEdit = async () => {
    await fetch('http://localhost:3000/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...taskData,
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate
      })
    });
  };
  */

  return (
    <>
      <Stack direction="row" spacing={0.5}>
        <IconButton aria-label="delete" onClick={() => {/*</Stack>handleDelete(task)*/}}>
          <DeleteIcon className='icon-buttons' />
        </IconButton>

        <IconButton aria-label="edit" onClick={() => {
          //handleEdit();
        }}>
          <EditIcon className='icon-buttons' />
        </IconButton>
      </Stack>
    </>
  );
}