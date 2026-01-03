import { api } from './api';
import type { Task } from '../../public/typeTask.ts';

export const updateTaskStatus = (task: Task, newStatus: string) => {
  return  api.put(`/tasks/${task.id}`, {
    ...task,
    status: newStatus
  });
};