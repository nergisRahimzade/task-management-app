import { api } from './api.ts';
import type { Task } from '../../public/typeTask.ts';

export const deleteTask = (deletedTask: Task) => {
  return api.delete(`/tasks/${deletedTask.id}`);
};