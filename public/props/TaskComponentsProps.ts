import type { Task } from '../typeTask.ts';

export type TaskComponentsProps = {
  taskData: Task[],
  setTaskData: React.Dispatch<React.SetStateAction<Task[]>>,
  refreshTasks: () => Promise<void>,
  chosenStatus: string,
  dialogComponentId: string,
  setDialogComponentId: (value: React.SetStateAction<string>) => void,
  selectedTask: Task | null,
  setSelectedTask: (value: React.SetStateAction<Task | null>) => void,
  taskToEdit: Task | null,
  setTaskToEdit: (value: React.SetStateAction<Task | null>) => void
};