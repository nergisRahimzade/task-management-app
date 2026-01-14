import type { Task } from '../typeTask.ts';

export type TaskListProps = {
  refreshTasks: () => Promise<void>,
  taskData: Task[],
  dialogComponentId: string,
  setDialogComponentId: (value: React.SetStateAction<string>) => void,
  setTaskToEdit: (value: React.SetStateAction<Task | null>) => void,
  setOpen: (value: React.SetStateAction<boolean>) => void
};