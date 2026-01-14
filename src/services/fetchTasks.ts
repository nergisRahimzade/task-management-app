import dayjs from 'dayjs';
import type { Task } from '../../public/typeTask.ts';
import { api } from './api.ts';

export const fetchTasks = () => {
  return api.get('/tasks');
};

export const fethcedParsedTasks = async () => {
  const response = await fetchTasks();
  const data = response.data;

  const parsedData = data.map((taskItem: Task) => (
    {
      ...taskItem,
      dueDate: taskItem.dueDate ? dayjs(taskItem.dueDate) : null
    }
  ));

  return parsedData;
};