import './Home.css'
import { useState, useEffect } from 'react';
import { TaskComponents } from '../components/task-components/TaskComponents.tsx';

import type { Task } from '../../public/typeTask.ts';
import { fethcedParsedTasks } from '../services/fetchTasks.ts';

import { FilterTasks } from '../components/filter-tasks/FilterTasks.tsx';
import { TaskList } from '../components/tasklist-component/TaskList.tsx';

export function Home() {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [chosenStatus, setChosenStatus] = useState('');

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
        <FilterTasks refreshTasks={refreshTasks} chosenStatus={chosenStatus} setChosenStatus={setChosenStatus} /> 
      </div>

      <TaskList refreshTasks={refreshTasks} taskData={taskData} setTaskData={setTaskData} chosenStatus={chosenStatus} />

    </div>
  )
}

