import type { Task } from './task.ts';

export type TaskDialogProps = {
  refreshTasks: () => Promise<void>,
  id: string,
  open: boolean,
  setOpen: (value: React.SetStateAction<boolean>) => void,
  taskToEdit?: Task | null
}