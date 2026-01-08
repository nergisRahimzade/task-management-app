import type { Task } from '../typeTask.ts';

export type TaskListProps = {
  refreshTasks: () => Promise<void>,
  taskData: Task[],
  setTaskData: (value: React.SetStateAction<Task[]>) => void,
  chosenStatus: string
};