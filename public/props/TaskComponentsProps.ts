import type { Task } from '../typeTask.ts';

export type TaskComponentsProps = {
  taskData: Task[],
  refreshTasks: () => Promise<void>,
  dialogComponentId: string,
  setDialogComponentId: (value: React.SetStateAction<string>) => void,
  setTaskToEdit: (value: React.SetStateAction<Task | null>) => void,
  setOpen: (value: React.SetStateAction<boolean>) => void
};