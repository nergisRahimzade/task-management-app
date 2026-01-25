import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import './TaskItem.css';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import type { Task } from '../../types/task.ts';

import { taskService } from '../../services/taskService.ts';
import type { TaskItemProps } from '../../types/index.ts';
import { TaskActionButtons } from './TaskActionButtons.tsx';

export function TaskItem({ taskData, refreshTasks, setDialogComponentId, setTaskToEdit, setOpen }: TaskItemProps) {
  const handleEdit = async (task: Task) => {
    await setTaskToEdit(task);
    console.log('TaskComponents -> taskToEdit: ', task);
    await setDialogComponentId('Edit');
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
                  onChange={async (event) => {
                    console.log(event.target.value);
                    await taskService.updateField(taskItem.id, taskItem, 'title', event.target.value);
                    refreshTasks();
                  }}
                  defaultValue={taskItem.title}
                  type='search'
                />
              </div>

              <div className='description'>
                <TextField
                  fullWidth
                  className='description-textfield'
                  onChange={async (event) => {
                    console.log(event.target.value);
                    await taskService.updateField(taskItem.id, taskItem, 'description', event.target.value);
                    refreshTasks();
                  }}
                  defaultValue={taskItem.description}
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
                    onChange={async (event) => {
                      await taskService.updateStatus(taskItem.id, taskItem, event.target.value);
                      refreshTasks();
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
                    defaultValue={taskItem.dueDate}
                    label='Due Date'
                    onChange={async (event) => {
                      await taskService.updateField(taskItem.id, taskItem, 'dueDate', event);
                      refreshTasks();
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