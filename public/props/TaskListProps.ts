import type { Task } from '../typeTask.ts';

export type TaskListProps = {
  refreshTasks: () => Promise<void>,
  taskData: Task[],
  setTaskData: (value: React.SetStateAction<Task[]>) => void,
  chosenStatus: string,
  dialogComponentId: string,
  setDialogComponentId: (value: React.SetStateAction<string>) => void,
  selectedTask: Task | null,
  setSelectedTask: (value: React.SetStateAction<Task | null>) => void,
  taskToEdit: Task | null,
  setTaskToEdit: (value: React.SetStateAction<Task | null>) => void
};