import type { Task } from './task.ts';

export type TaskDialogProps = {
  refreshTasks: () => Promise<void>,
  id: string,
  open: boolean,
  taskToEdit?: Task | null,
  setOpen: (value: React.SetStateAction<boolean>) => void
}

export type TaskFilterProps = {
  chosenStatus: string,
  setChosenStatus: (value: React.SetStateAction<string>) => void,
  setDialogComponentId: (value: React.SetStateAction<string>) => void,
  setTaskToEdit: (value: React.SetStateAction<Task | null>) => void,
  setOpen: (value: React.SetStateAction<boolean>) => void
}

export type TaskActionButtonsProps = {
  refreshTasks: () => Promise<void>,
  handleEdit: (updatedTask: Task) => void | Promise<void>,
  taskItem: Task
}

export type TaskItemProps = {
  refreshTasks: () => Promise<void>,
  taskData: Task[],
  dialogComponentId: string,
  setDialogComponentId: (value: React.SetStateAction<string>) => void,
  setTaskToEdit: (value: React.SetStateAction<Task | null>) => void,
  setOpen: (value: React.SetStateAction<boolean>) => void
}

export type TaskListViewProps = {
  refreshTasks: () => Promise<void>,
  taskData: Task[],
  dialogComponentId: string,
  setDialogComponentId: (value: React.SetStateAction<string>) => void,
  setTaskToEdit: (value: React.SetStateAction<Task | null>) => void,
  setOpen: (value: React.SetStateAction<boolean>) => void
}