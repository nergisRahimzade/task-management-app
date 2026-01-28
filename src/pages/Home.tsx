import { TaskFilter } from '../components/TaskFilter/TaskFilter.tsx';
import { TaskListView } from '../components/TaskListView/TaskListView.tsx';
import { TaskDialog } from '../components/TaskDialog/TaskDialog.tsx';

import type { Task } from '../types/task.ts';
import { taskService } from '../services/taskService.ts';

import { useState, useEffect, useMemo, useCallback } from 'react';
import './Home.css'
import { Header } from '../components/Header/Header.tsx';

export function Home() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [chosenStatus, setChosenStatus] = useState('');
  const [open, setOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  //this function fetches the task data to refresh the page after some action (delete / add / edit task).
  const refreshTasks = useCallback(async () => {
    const parsedData = await taskService.getAllParsed();
    setAllTasks(parsedData);
  }, [setAllTasks]);

  useEffect(() => {
    refreshTasks();
  }, []);

  //this variable ensures that we use/get the tasks with the chosen status if the user chooses any status to filter tasks.
  const taskData = useMemo(() => {
    if (chosenStatus === '')
      return allTasks;

    else {
      return allTasks.filter(task => task.status === chosenStatus);
    }
  }, [allTasks, chosenStatus]);

  return (
    <div className='container'>
      <div className='button-filter-container'>
        <TaskFilter
          chosenStatus={chosenStatus}
          setChosenStatus={setChosenStatus}
          setTaskToEdit={setTaskToEdit}
          setOpen={setOpen}
        />
      </div>

      <Header />

      <TaskListView
        refreshTasks={refreshTasks}
        taskData={taskData}
        setTaskToEdit={setTaskToEdit}
        setOpen={setOpen}
      />

      <TaskDialog
        refreshTasks={refreshTasks}
        open={open}
        setOpen={setOpen}
        taskToEdit={taskToEdit}
      />

    </div>
  )
}

