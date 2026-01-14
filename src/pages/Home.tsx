import './Home.css'
import { useState, useEffect, useMemo } from 'react';

import type { Task } from '../../public/typeTask.ts';
import { fethcedParsedTasks } from '../services/fetchTasks.ts';

import { FilterTasks } from '../components/filter-tasks/FilterTasks.tsx';
import { TaskList } from '../components/tasklist-component/TaskList.tsx';
import { DialogComponent } from '../components/dialog-component/DialogComponent.tsx';

export function Home() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [chosenStatus, setChosenStatus] = useState('');
  const [dialogComponentId, setDialogComponentId] = useState('');
  const [open, setOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const refreshTasks = async () => {
    const parsedData = await fethcedParsedTasks();
    setAllTasks(parsedData);
  };

  const taskData = useMemo(() => {
    if(chosenStatus === '')
      return allTasks;

    else {
      //shortcut of 
      // return allTasks.filter((taskItem) => {
      //   return taskItem.status === chosenStatus;
      // });
      return allTasks.filter(task => task.status === chosenStatus);
    }
  }, [allTasks, chosenStatus]);

  useEffect(() => {
    refreshTasks();
  }, []);

  useEffect(() => {
    console.log('Home -> taskToEdit : ', taskToEdit);
  }, [taskToEdit]);


  return (
    <div className='container'>
      <div className='button-filter-container'>
        <FilterTasks
          chosenStatus={chosenStatus}
          setChosenStatus={setChosenStatus}
          setDialogComponentId={setDialogComponentId}
          setTaskToEdit={setTaskToEdit}
          setOpen={setOpen}
        />
      </div>

      <TaskList
        refreshTasks={refreshTasks}
        taskData={taskData}
        dialogComponentId={dialogComponentId}
        setDialogComponentId={setDialogComponentId}
        setTaskToEdit={setTaskToEdit}
        setOpen={setOpen}
      />

      <DialogComponent
        refreshTasks={refreshTasks}
        id={dialogComponentId}
        open={open}
        setOpen={setOpen}
        taskToEdit={taskToEdit}
      />

    </div>
  )
}

