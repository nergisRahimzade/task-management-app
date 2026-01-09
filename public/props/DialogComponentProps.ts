import type { Task } from '../typeTask.ts';

export type DialogComponentProps = {
  refreshTasks: () => Promise<void>,
  id: string,
  open: boolean,
  setOpen: (value: React.SetStateAction<boolean>) => void,
  taskToEdit?: Task | null,
  setSelectedTask: (value: React.SetStateAction<Task | null>) => void
}