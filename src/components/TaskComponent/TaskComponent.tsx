import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import './TaskComponent.css';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import type { Task } from '../../../public/props/task.ts';
import type { TaskComponentsProps } from '../../../public/props/TaskComponentsProps.ts';
import type { TaskActionButtonsProps } from '../../../public/props/TaskActionButtonsProps.ts';

import { taskService } from '../../services/taskService.ts';

export function TaskComponent({ taskData, refreshTasks, setDialogComponentId, setTaskToEdit, setOpen }: TaskComponentsProps) {
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
                    taskService.updateField(taskItem.id, taskItem, 'title', event.target.value);
                    await refreshTasks();
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
                    taskService.updateField(taskItem.id, taskItem, 'description', event.target.value);
                    await refreshTasks();
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
                      taskService.updateStatus(taskItem.id, taskItem, event.target.value);
                      await refreshTasks();
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
                      taskService.updateField(taskItem.id, taskItem, 'dueDate', event);
                      await refreshTasks();
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

export function TaskActionButtons({ handleEdit, taskItem, refreshTasks }: TaskActionButtonsProps) {
  return (
    <>

      <Stack direction="row" spacing={1} className='task-change-buttons-container'>
        <IconButton
          aria-label="delete"
          className='task-change-buttons-delete'
          onClick={async () => {
            taskService.deleteTask(taskItem.id);
            await refreshTasks();
          }}
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