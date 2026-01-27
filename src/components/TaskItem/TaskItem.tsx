import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import './TaskItem.css';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import type { Task } from '../../types/task.ts';

import { taskService } from '../../services/taskService.ts';
import type { TaskItemProps } from '../../types/index.ts';
import { TaskActionButtons } from './TaskActionButtons.tsx';
import { useEffect, useMemo } from 'react';
import { debounce } from 'lodash';

export function TaskItem({ taskData, refreshTasks, setIsEditOn, setTaskToEdit, setOpen }: TaskItemProps) {
  const debounceCall = useMemo(() =>
    debounce(async (id: string, task: Task, field: string, value: any) => {
      if (field === '') {
        await taskService.updateStatus(id, task, value);
      }
      else {
        await taskService.updateField(id, task, field, value);
      }
      await refreshTasks();
    }, 500),
    [refreshTasks]);

  useEffect(() => {
    return () => debounceCall.cancel();
  }, [debounceCall]);

  const handleEdit = async (task: Task) => {
    setTaskToEdit(task);
    setIsEditOn(true);
    setOpen(true);
  };

  return (
    <>
      {taskData.map((taskItem) => (
        <div key={taskItem.id} className='tasks-container'>

          <div>
            <div className='taskItems-container'>
              <div className='title'>
                <TextField
                  fullWidth
                  className='title-textfield'
                  onChange={(event) => {
                    debounceCall(taskItem.id, taskItem, 'title', event.target.value);
                    //await taskService.updateField(taskItem.id, taskItem, 'title', event.target.value);
                    //refreshTasks();
                  }}
                  value={taskItem.title}
                  type='search'
                />
              </div>

              <div className='description'>
                <TextField
                  fullWidth
                  className='description-textfield'
                  onChange={(event) => {
                    debounceCall(taskItem.id, taskItem, 'description', event.target.value);
                    //await taskService.updateField(taskItem.id, taskItem, 'description', event.target.value);
                    //refreshTasks();
                  }}
                  value={taskItem.description}
                />
              </div>

              <div className='status'>
                <FormControl required fullWidth sx={{ m: 1, minWidth: 120 }}>
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
                    onChange={(event) => {
                      debounceCall(taskItem.id, taskItem, '', event.target.value);
                      //await taskService.updateStatus(taskItem.id, taskItem, event.target.value);
                      //refreshTasks();
                    }}
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
                    onChange={(event) => {
                      debounceCall(taskItem.id, taskItem, 'dueDate', event);
                      //await taskService.updateField(taskItem.id, taskItem, 'dueDate', event);
                      //refreshTasks();
                    }}
                  />
                </LocalizationProvider>
              </div>

              <TaskActionButtons handleEdit={handleEdit} taskItem={taskItem} refreshTasks={refreshTasks} />
            </div>

          </div>

        </div >
      ))
      }

    </>
  );
}