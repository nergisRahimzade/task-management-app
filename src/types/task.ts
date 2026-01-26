import { Dayjs } from "dayjs";

export type TaskStatus = '' | 'TD' | 'IP' | 'D';
export type DialogMode = 'create' | 'edit';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: Dayjs | null;
};