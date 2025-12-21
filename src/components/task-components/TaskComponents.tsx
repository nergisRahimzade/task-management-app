import { useState, useEffect } from 'react';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import './TaskComponents.css';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { DialogComponent } from '../dialog-component/DialogComponent';

// Define the type for your task
interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: Dayjs | null;
}

interface TaskComponentsProps {
  taskData: Task[],
  setTaskData: React.Dispatch<React.SetStateAction<Task[]>>,
  refreshTasks: () => Promise<void>
}

type Elements = {
  title: string;
  status: string;
  dueDate: Dayjs | null;
}

export function TaskComponents({ taskData, setTaskData, refreshTasks }: TaskComponentsProps) {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [values, setValues] = useState<Elements>({
    title: '',
    status: '',
    dueDate: null
  });
  const [errorValues, setErrorValues] = useState<Partial<Elements>>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/tasks');
      const data = await response.json();

      const parsedData = data.map((task: Task) => ({
        ...task,
        dueDate: task.dueDate ? dayjs(task.dueDate) : null
      }));

      setTaskData(parsedData);
    };

    fetchData();
  }, []);

  const handleDelete = async (deletedTask: Task): Promise<void> => {
    await fetch((`http://localhost:3000/tasks/${deletedTask.id}`), {
      method: 'DELETE'
    });

    refreshTasks();
  };

  const handleEdit = async (task: Task) => {
    setSelectedTask(task);
    handleShowModal();
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

    refreshTasks();
  };

  const handleShowModal = async () => {
    setOpen(true);
  }

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  return (
    <>
      {taskData.map((taskItem) => (
        <div key={taskItem.id} className='tasks-container'>

          <div className='taskItems-container'>
            <TaskChangeButtons handleDelete={handleDelete} handleEdit={handleEdit} taskItem={taskItem} />

            <div className='title'>
              {taskItem.title}
            </div>

            <div className='description'>
              {taskItem.description}
            </div>

            <div className='status'>
              <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel
                  id="demo-simple-select-required-label"
                >
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={taskItem.status}
                  label="Status"
                  name='status'
                  onChange={(event) => { handleStatusChange(taskItem, event.target.value) }}
                >
                  <MenuItem value='TD'>TD</MenuItem>
                  <MenuItem value='IP'>IP</MenuItem>
                  <MenuItem value='D'>D</MenuItem>

                </Select>

              </FormControl>

            </div>

            <div className='due-date'>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
              >
                <DatePicker
                  name='dueDate'
                  value={taskItem.dueDate}
                  label='Due Date'
                  readOnly
                />
              </LocalizationProvider>
            </div>
          </div>

        </div>
      ))}

      {(
        <>
          <DialogComponent
            refreshTasks={refreshTasks}
            id='Task Components'
            open={open}
            onClose={handleCloseModal}
            taskToEdit={selectedTask}
          />

          {/* think if onClose and open should be deleted or not */}
        </>
      )}

    </>
  );
}

interface TaskComponentsProps {
  taskData: Task[],
  setTaskData: React.Dispatch<React.SetStateAction<Task[]>>,
  refreshTasks: () => Promise<void>
}

interface TaskChangeButtonsProps {
  handleDelete: (updatedTask: Task) => void | Promise<void>,
  handleEdit: (updatedTask: Task) => void | Promise<void>,
  taskItem: Task
}

export function TaskChangeButtons({ handleDelete, handleEdit, taskItem }: TaskChangeButtonsProps) {
  return (
    <>
      
        <Stack direction="row" spacing={1}>
          <IconButton
            aria-label="delete"
            className='task-change-buttons-delete'
            onClick={() => { handleDelete(taskItem) }}
          >
            <DeleteIcon />
          </IconButton>

          <IconButton
            aria-label="edit"
            className='task-change-buttons-delete'
            onClick={() => { handleEdit(taskItem) }}
          >
            <EditIcon />
          </IconButton>
        </Stack>
      
    </>
  );
}