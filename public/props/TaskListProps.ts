import type { Task } from '../typeTask.ts';

export type TaskListProps = {
  refreshTasks: () => Promise<void>,
  taskData: Task[],
  chosenStatus: string,
  dialogComponentId: string,
  setDialogComponentId: (value: React.SetStateAction<string>) => void,
  selectedTask: Task | null,
  setSelectedTask: (value: React.SetStateAction<Task | null>) => void,
  setTaskToEdit: (value: React.SetStateAction<Task | null>) => void,
  setOpen: (value: React.SetStateAction<boolean>) => void
};