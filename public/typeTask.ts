import { Dayjs } from "dayjs";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: Dayjs | null;
};