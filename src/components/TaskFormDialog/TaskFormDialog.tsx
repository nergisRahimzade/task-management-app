import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Button, Dialog, DialogTitle, FormControl, InputLabel, List, ListItem, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import './TaskFormDialog.css';

import type { Task } from '../../../public/props/task.ts';
import type { DialogComponentProps } from '../../../public/props/DialogComponentProps.ts';

import { taskService } from '../../services/taskService.ts';

export function TaskFormDialog({ refreshTasks, id, open, setOpen, taskToEdit }: DialogComponentProps) {
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

  const isFormValid = useMemo<boolean>((): boolean => {
    return task.title.length > 0
      && task.description.length > 0
      && task.status.length > 0
      && task.dueDate !== null;
  }, [task]);

  const handleCloseModal = () => {
    setOpen(false);
    setTask({ id: '', title: '', description: '', status: '', dueDate: null });
  };

  const handleTaskAction = (newValue: any, field: string) => {
    setTask({ ...task, [field]: newValue });
  };

  const handleSubmit = async () => {
    await taskService.saveTask(task);
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
              onChange={(event: any) => handleTaskAction(event.target.value, 'title')}
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
              onChange={(event: any) => handleTaskAction(event.target.value, 'description')}
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
                  onChange={(event: any) => handleTaskAction(event?.target?.value, 'status')}
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
                  onChange={(event: any) => handleTaskAction(event, 'dueDate')}
                  label='Due Date'
                  value={task.dueDate}
                />
              </DemoContainer>
            </LocalizationProvider>
          </ListItem>

          <ListItem>
            <Button
              variant='contained'
              onClick={handleSubmit}
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