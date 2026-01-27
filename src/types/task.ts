import { Dayjs } from "dayjs";
import type { TASK_STATUS } from '../../src/constants/taskStatus.ts';

export type TaskStatus = typeof TASK_STATUS[keyof typeof TASK_STATUS];

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: Dayjs | null;
};

//new union type for fields
export type TaskField = "title" | "description" | "dueDate"; 

//new proper types for API
export type CreateTaskInput = Omit<Task, 'id'>;
export type UpdateTaskInput = Partial<Omit<Task, 'id'>>;