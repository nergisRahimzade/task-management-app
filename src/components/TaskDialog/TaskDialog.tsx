import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

import { Alert, Button, Dialog, DialogTitle, FormControl, InputLabel, List, ListItem, MenuItem, Select, TextField, type SelectChangeEvent } from '@mui/material';
import { useEffect, useId, useMemo, useState } from 'react';

import { taskService } from '../../services/taskService.ts';
import type { Task } from '../../types/task.ts';
import type { TaskDialogProps } from '../../types/index.ts';
import type dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { TASK_STATUS, TASK_STATUS_LABELS } from '../../constants/taskStatus.ts';

export function TaskDialog({ refreshTasks, open, setOpen, taskToEdit }: TaskDialogProps) {
  const [hasError, setHasError] = useState(false);
  const [task, setTask] = useState<Task>(taskToEdit || {
    id: '',
    title: '',
    description: '',
    status: TASK_STATUS.NULL,
    dueDate: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const titleId = useId();
  const descriptionId = useId();
  const statusId = useId();
  const labelId = useId();

  useEffect(() => {
    if (taskToEdit)
      setTask(taskToEdit);
  }, [taskToEdit]);

  const isFormValid = useMemo(() => {
    return task.title.trim().length > 0
      && task.description.trim().length > 0
      && task.status.length > 0
      && task.dueDate !== null;
  }, [task]);

  const handleCloseModal = () => {
    setOpen(false);
    setTask({ id: '', title: '', description: '', status: TASK_STATUS.NULL, dueDate: null });
    setHasError(false);
  };

  const handleTaskAction = (newValue: string | dayjs.Dayjs | null, field: keyof Task) => {
    setTask({ ...task, [field]: newValue });
    setHasError(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setHasError(false);
    try {
      await taskService.saveTask(task);
      handleCloseModal();
      await refreshTasks();
    } catch (error) {
      console.error('Failed to call API saveTask(): ', error);
      setHasError(true);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='dialog-container'>
      <Dialog
        onClose={handleCloseModal}
        open={open}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          },
        }}
        className='dialog'
      >
        <DialogTitle>{task.id === '' ? 'Add New' : 'Edit'} Task</DialogTitle>
        <List sx={{ pt: 1 }}>
          <ListItem sx={{ mb: 2 }} className='dialog-item'>
            <TextField
              id={titleId}
              label="Title"
              name='title'
              value={task.title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleTaskAction(event.target.value, 'title')}
            />
          </ListItem>

          <ListItem sx={{ mb: 2 }} className='dialog-item'>
            <TextField
              id={descriptionId}
              label='Description'
              name='description'
              value={task.description}
              multiline
              rows={5}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleTaskAction(event.target.value, 'description')}
            />
          </ListItem>


          <ListItem sx={{ mb: 2 }} className='dialog-item'>
            <FormControl required sx={{ minWidth: 160 }}>
              <InputLabel
                id={labelId}
              >
                Status
              </InputLabel>
              <Select
                labelId={labelId}
                id={statusId}
                value={task.status}
                label="Status"
                name='status'
                onChange={(event: SelectChangeEvent) => handleTaskAction(event?.target?.value, 'status')}
              >
                <MenuItem value={TASK_STATUS.TO_DO}>
                  {TASK_STATUS_LABELS[TASK_STATUS.TO_DO]}
                </MenuItem>
                <MenuItem value={TASK_STATUS.IN_PROGRESS}>
                  {TASK_STATUS_LABELS[TASK_STATUS.IN_PROGRESS]}
                </MenuItem>
                <MenuItem value={TASK_STATUS.DONE}>
                  {TASK_STATUS_LABELS[TASK_STATUS.DONE]}
                </MenuItem>

              </Select>

            </FormControl>
          </ListItem>


          <ListItem sx={{ mb: 2 }} className='dialog-item'>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
            >
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  name='dueDate'
                  onChange={(value: Dayjs | null) => handleTaskAction(value, 'dueDate')}
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
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Done'}
            </Button>
          </ListItem>

          {hasError && (
            <Alert severity='error'>There has been an error in calling API. </Alert>
          )}

          {!isFormValid && (
            <Alert severity='info'>Please fill in all required fields. </Alert>
          )}

        </List>
      </Dialog>
    </div>
  );
}