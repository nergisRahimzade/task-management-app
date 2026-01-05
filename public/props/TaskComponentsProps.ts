import type { Task } from '../typeTask.ts';

export type TaskComponentsProps = {
  taskData: Task[],
  setTaskData: React.Dispatch<React.SetStateAction<Task[]>>,
  refreshTasks: () => Promise<void>,
  chosenStatus: string
};