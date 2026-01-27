import { Alert, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import type { Task } from '../../types/task.ts';
import type { TaskItemProps } from '../../types/index.ts';
import { taskService } from '../../services/taskService.ts';

import { TaskActionButtons } from './TaskActionButtons.tsx';
import { useEffect, useId, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import './TaskItem.css';
import type { Dayjs } from 'dayjs';
import { TASK_STATUS, TASK_STATUS_LABELS } from '../../constants/taskStatus.ts';

export function TaskItem({ taskData, refreshTasks, setIsEditOn, setTaskToEdit, setOpen }: TaskItemProps) {
  const [hasError, setHasError] = useState(false);

  const titleId = useId();
  const descriptionId = useId();
  const statusId = useId();
  const labelId = useId();

  const debounceCall = useMemo(() =>
    debounce(async (id: string, task: Task, field: string, value: any) => {
      if (field === '') {
        try {
          await taskService.updateStatus(id, task, value);
        } catch (error) {
          console.error('Failed to call API updateStatus(): ', error);
          setHasError(true);
          throw error;
        }
      }
      else {
        await taskService.updateField(id, task, field, value);
      }
      await refreshTasks();
    }, 500),
    [refreshTasks]);

  useEffect(() => {
    return () => {
      debounceCall.cancel();
      setHasError(false);
    };
  }, [debounceCall]);

  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
    setIsEditOn(true);
    setOpen(true);
  };

  return (
    <>
      {taskData.map((taskItem) => (
        <div key={taskItem.id} className='tasks-container'>
          <div className='taskItems-container'>
            <div className='title'>
              <TextField
                id={titleId}
                fullWidth
                className='title-textfield'
                onChange={(event) => {
                  debounceCall(taskItem.id, taskItem, 'title', event.target.value);
                }}
                value={taskItem.title}
                type='search'
              />
            </div>

            <div className='description'>
              <TextField
                id={descriptionId}
                fullWidth
                className='description-textfield'
                onChange={(event) => {
                  debounceCall(taskItem.id, taskItem, 'description', event.target.value);

                }}
                value={taskItem.description}
              />
            </div>

            <div className='status'>
              <FormControl required fullWidth sx={{ m: 1, minWidth: 120 }}>
                <InputLabel
                  id={labelId}
                >
                  Status
                </InputLabel>
                <Select
                  labelId={labelId}
                  id={statusId}
                  value={taskItem.status}
                  label="Status"
                  name='status'
                  onChange={(event) => {
                    debounceCall(taskItem.id, taskItem, '', event.target.value);
                  }}
                >
                  <MenuItem value={TASK_STATUS.IN_PROGRESS}>
                    {TASK_STATUS_LABELS[TASK_STATUS.IN_PROGRESS]}
                  </MenuItem>
                  <MenuItem value={TASK_STATUS.DONE}>
                    {TASK_STATUS_LABELS[TASK_STATUS.DONE]}
                  </MenuItem>
                  <MenuItem value={TASK_STATUS.DONE}>
                    {TASK_STATUS_LABELS[TASK_STATUS.DONE]}
                  </MenuItem>

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
                  onChange={(newValue: Dayjs | null) => {
                    debounceCall(taskItem.id, taskItem, 'dueDate', newValue);
                  }}
                />
              </LocalizationProvider>
            </div>

            <TaskActionButtons handleEdit={handleEdit} taskItem={taskItem} refreshTasks={refreshTasks} />
          </div>


        </div >
      ))
      }

      {hasError && (
        <Alert severity='error'>There has been an error in calling API. </Alert>
      )}

    </>
  );
}