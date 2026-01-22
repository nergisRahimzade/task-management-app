import { api } from './api.ts';
import type { Task } from '../../public/props/task.ts';

export const deleteTask = (deletedTask: Task) => {
  return api.delete(`/tasks/${deletedTask.id}`);
};