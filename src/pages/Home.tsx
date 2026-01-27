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
  const [isEditOn, setIsEditOn] = useState(false);
  const [open, setOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const refreshTasks = useCallback(async () => {
    const parsedData = await taskService.getAllParsed();
    setAllTasks(parsedData);
  }, [setAllTasks]);

  useEffect(() => {
    refreshTasks();
  }, []);

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
          setIsEditOn={setIsEditOn}
          setTaskToEdit={setTaskToEdit}
          setOpen={setOpen}
        />
      </div>

      <Header />

      <TaskListView
        refreshTasks={refreshTasks}
        taskData={taskData}
        setIsEditOn={setIsEditOn}
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

