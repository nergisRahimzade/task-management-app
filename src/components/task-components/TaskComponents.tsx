import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import './TaskComponents.css';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { deleteTask } from '../../services/deleteTask.ts';
import { updateTaskStatus } from '../../services/updateTaskStatus.ts';
import type { Task } from '../../../public/typeTask.ts';
import type { TaskComponentsProps } from '../../../public/props/TaskComponentsProps.ts';
import type { TaskChangeButtonsProps } from '../../../public/props/TaskChangeButtonsProps.ts';
import { useEffect, useState } from 'react';
import { updateChanges } from '../../services/updateChanges.ts';

export function TaskComponents({ taskData, refreshTasks, setDialogComponentId, setTaskToEdit, setOpen }: TaskComponentsProps) {
  //const [disabled, setDisabled] = useState(true);
  const [textboxActive, setTextboxActive] = useState(false);

  const handleClick = async (task: Task, event: any, keyword: string) => {
    //setTextboxActive(true);
    await updateChanges(task, event?.target.value, keyword);
    refreshTasks();
  };

  //useEffect(() => {
  //}, [textboxActive]);

  const handleDelete = async (deletedTask: Task): Promise<void> => {
    await deleteTask(deletedTask);
    refreshTasks();
  };

  const handleEdit = async (task: Task) => {
    await setTaskToEdit(task);
    console.log('TaskComponents -> taskToEdit: ', task);
    await setDialogComponentId('Edit');
    setOpen(true);
  };

  const handleStatusChange = async (taskItem: Task, newStatus: string) => {
    await updateTaskStatus(taskItem, newStatus);
    await refreshTasks();
  };

  return (
    <>
      {taskData.map((taskItem) => (
        <div key={taskItem.id} className='tasks-container'>

          <div>
            <div className='taskItems-container'>
              <TextField
                className='title'
                onChange={(event) => {
                  console.log(event.target.value);
                  updateChanges(taskItem, event.target.value, 'title');
                }}
                defaultValue={taskItem.title}
                type='search'
              >
                
              </TextField>

              <TextField
                className='description'
                onChange={(event) => {
                  console.log(event.target.value);
                  updateChanges(taskItem, event.target.value, 'description');
                }}
                defaultValue={taskItem.description}
              >
                {taskItem.description}
              </TextField>

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
                    defaultValue={taskItem.dueDate}
                    label='Due Date'
                    onChange={(event) => {
                      updateChanges(taskItem, event , 'dueDate');
                      refreshTasks();
                    }}
                  />
                </LocalizationProvider>
              </div>

              <TaskChangeButtons handleDelete={handleDelete} handleEdit={handleEdit} taskItem={taskItem} />
            </div>

          </div>

        </div>
      ))}

    </>
  );
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