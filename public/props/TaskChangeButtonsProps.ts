import type { Task } from '../typeTask.ts';

export type TaskChangeButtonsProps = {
  handleDelete: (updatedTask: Task) => void | Promise<void>,
  handleEdit: (updatedTask: Task) => void | Promise<void>,
  taskItem: Task
}