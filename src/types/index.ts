import type { Task } from './task.ts';

export type TaskDialogProps = {
  refreshTasks: () => Promise<void>,
  open: boolean,
  taskToEdit: Task | null,
  setOpen: (open: boolean) => void,
}

export type TaskFilterProps = {
  chosenStatus: string,
  setChosenStatus: (chosenStatus: string) => void,
  setTaskToEdit: (taskToEdit: Task | null) => void,
  setOpen: (open: boolean) => void
}

export type TaskActionButtonsProps = {
  setTaskToEdit: (taskToEdit: Task | null) => void,
  setOpen: (open: boolean) => void,
  refreshTasks: () => Promise<void>,
  taskItem: Task
}

export type TaskItemProps = {
  refreshTasks: () => Promise<void>,
  taskData: Task[],
  setTaskToEdit: (taskToEdit: Task | null) => void,
  setOpen: (open: boolean) => void
}

export type TaskListViewProps = {
  refreshTasks: () => Promise<void>,
  taskData: Task[],
  setTaskToEdit: (taskToEdit: Task | null) => void,
  setOpen: (open: boolean) => void
}