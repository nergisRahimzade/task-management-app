import './Home.css'
import { useState, useEffect } from 'react';

import type { Task } from '../../public/typeTask.ts';
import { fethcedParsedTasks } from '../services/fetchTasks.ts';

import { FilterTasks } from '../components/filter-tasks/FilterTasks.tsx';
import { TaskList } from '../components/tasklist-component/TaskList.tsx';
import { DialogComponent } from '../components/dialog-component/DialogComponent.tsx';

export function Home() {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [chosenStatus, setChosenStatus] = useState('');
  const [dialogComponentId, setDialogComponentId] = useState('');
  const [open, setOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const refreshTasks = async () => {
    const parsedData = await fethcedParsedTasks();
    setTaskData(parsedData);
  };

  useEffect(() => {
    refreshTasks();
  }, []);


  return (
    <div className='container'>
      <div className='button-filter-container'>
        <FilterTasks
          refreshTasks={refreshTasks}
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
        chosenStatus={chosenStatus}
        dialogComponentId={dialogComponentId}
        setDialogComponentId={setDialogComponentId}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        setTaskToEdit={setTaskToEdit}
        setOpen={setOpen}
      />

      <DialogComponent
        refreshTasks={refreshTasks}
        id={dialogComponentId}
        open={open}
        setOpen={setOpen}
        taskToEdit={taskToEdit}
        setSelectedTask={setSelectedTask}
      />

    </div>
  )
}

