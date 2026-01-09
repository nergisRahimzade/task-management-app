import type { Task } from '../typeTask.ts';

export type TaskComponentsProps = {
  taskData: Task[],
  refreshTasks: () => Promise<void>,
  chosenStatus: string,
  dialogComponentId: string,
  setDialogComponentId: (value: React.SetStateAction<string>) => void,
  selectedTask: Task | null,
  setSelectedTask: (value: React.SetStateAction<Task | null>) => void,
  setTaskToEdit: (value: React.SetStateAction<Task | null>) => void,
  setOpen: (value: React.SetStateAction<boolean>) => void
};