import type { Task } from './task.ts';

export type TaskActionButtonsProps = {
  handleEdit: (updatedTask: Task) => void | Promise<void>,
  taskItem: Task,
  refreshTasks: () => Promise<void>
}