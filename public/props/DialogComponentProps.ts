import type { Task } from '../typeTask.ts';

export type DialogComponentProps = {
  refreshTasks: () => Promise<void>,
  id: string,
  open: boolean,     
  onClose: () => void,
  taskToEdit?: Task | null
}