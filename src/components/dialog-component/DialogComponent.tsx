import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

import { Button, Dialog, DialogTitle, FormControl, InputLabel, List, ListItem, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import './DialogComponent.css';

import type { Task } from '../../../public/typeTask.ts';
import { apiActionForDialog } from '../../services/apiActionForDialog.ts';

interface DialogComponentProps {
  refreshTasks: () => Promise<void>,
  id: string,
  open: boolean,     
  onClose: () => void,
  taskToEdit?: Task | null
}

export function DialogComponent({ refreshTasks, id, open, onClose, taskToEdit }: DialogComponentProps) {
  let addTaskOn = id === 'Add Task' ? true : false;
  const [task, setTask] = useState<Task>(taskToEdit || {
    id: '',
    title: '',
    description: '',
    status: '',
    dueDate: null
  });

  useEffect(() => {
    if(taskToEdit)
      setTask(taskToEdit);
  }, [taskToEdit]);

  const handleCloseModal = () => {
    setTask({ id: '', title: '', description: '', status: '', dueDate: null });
    onClose();
  };

  const handleTaskAction = (event: any) => {
    setTask({ ...task, [event?.target.name]: event?.target.value });
  };

  const handleTaskAction_Date = (newValue: Dayjs | null) => {
    setTask({ ...task, dueDate: newValue });
  };

  /*
  const handleStatusChange = async (newStatus: string) => {
    await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...task,
        status: newStatus
      })
    });
  };
  */

  const isFormValid = useMemo<boolean>((): boolean => {
    return task.title.length > 0 
      && task.description.length > 0 
      && task.status.length > 0
      && task.dueDate !== null;
  }, [task]);

  const handleSubmit = async () => {
    await apiActionForDialog(task);
    handleCloseModal();
    refreshTasks();
  };

  return (
    <div className='dialog-container'>
      <Dialog
        onClose={handleCloseModal}
        open={open}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // opacity here
          },
        }}
        className='dialog'
      >
        <DialogTitle>{task.id === '' ? 'Add New' : 'Edit'} Task</DialogTitle>
        <List sx={{ pt: 1 }}>
          <ListItem sx={{ mb: 2 }} className='dialog-item'>
            <TextField
              id="outlined-basic"
              label="Title"
              name='title'
              value={task.title}
              onChange={handleTaskAction}
            />
          </ListItem>

          <ListItem sx={{ mb: 2 }} className='dialog-item'>
            <TextField
              id='outlined-multiline-static'
              label='Description'
              name='description'
              value={task.description}
              multiline
              rows={5}
              onChange={handleTaskAction}
            />
          </ListItem>

          {addTaskOn && (
            <ListItem sx={{ mb: 2 }} className='dialog-item'>
              <FormControl required sx={{ minWidth: 160 }}>
                <InputLabel
                  id="demo-simple-select-required-label"
                >
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={task.status}
                  label="Status"
                  name='status'
                  onChange={handleTaskAction}
                >
                  <MenuItem value='TD'>TD</MenuItem>
                  <MenuItem value='IP'>IP</MenuItem>
                  <MenuItem value='D'>D</MenuItem>

                </Select>

              </FormControl>
            </ListItem>
          )}

          <ListItem sx={{ mb: 2 }} className='dialog-item'>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
            >
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  name='dueDate'
                  onChange={handleTaskAction_Date}
                  label='Due Date'
                  value={task.dueDate}
                />
              </DemoContainer>
            </LocalizationProvider>
          </ListItem>

          <ListItem>
            <Button
              variant='contained'
              onClick={ handleSubmit }
              disabled={!isFormValid}
            >
              Done
            </Button>
          </ListItem>

        </List>
      </Dialog>
    </div>
  );
}