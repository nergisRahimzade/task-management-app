import { useState } from 'react';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import './TaskComponents.css';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DialogComponent } from '../dialog-component/DialogComponent';

import {deleteTask} from '../../services/deleteTask.ts';
import { updateTaskStatus } from '../../services/updateTaskStatus.ts';
import type { Task } from '../../../public/typeTask.ts';

interface TaskComponentsProps {
  taskData: Task[],
  setTaskData: React.Dispatch<React.SetStateAction<Task[]>>,
  refreshTasks: () => Promise<void>,
  chosenStatus: string
}

export function TaskComponents({ taskData, refreshTasks, chosenStatus }: TaskComponentsProps) {
  //chosenStatus is for filtering task 
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleDelete = async (deletedTask: Task): Promise<void> => {
    await deleteTask(deletedTask);
    refreshTasks();
  };

  const handleEdit = async (task: Task) => {
    setSelectedTask(task);
    handleShowModal();
  };

  const handleStatusChange = async (taskItem: Task, newStatus: string) => {
    await updateTaskStatus(taskItem, newStatus);
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

          <div >
            {(chosenStatus !== '') && (taskItem.status === chosenStatus) && (
              <div className='taskItems-container'>
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

                  <TaskChangeButtons handleDelete={handleDelete} handleEdit={handleEdit} taskItem={taskItem} />
              </div>
            )}

            {(chosenStatus === '') && (
              <div className='taskItems-container'>
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

                <TaskChangeButtons handleDelete={handleDelete} handleEdit={handleEdit} taskItem={taskItem} />
              </div>
            )}

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

      <Stack direction="row" spacing={1} className='task-change-buttons-container'>
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