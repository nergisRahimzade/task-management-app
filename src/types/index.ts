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
  setIsEditOn: (isEditOn: boolean) => void,
  setTaskToEdit: (taskToEdit: Task | null) => void,
  setOpen: (open: boolean) => void
}

export type TaskActionButtonsProps = {
  refreshTasks: () => Promise<void>,
  handleEdit: (updatedTask: Task) => void | Promise<void>,
  taskItem: Task
}

export type TaskItemProps = {
  refreshTasks: () => Promise<void>,
  taskData: Task[],
  setIsEditOn: (isEditOn: boolean) => void,
  setTaskToEdit: (taskToEdit: Task | null) => void,
  setOpen: (open: boolean) => void
}

export type TaskListViewProps = {
  refreshTasks: () => Promise<void>,
  taskData: Task[],
  setIsEditOn: (isEditOn: boolean) => void,
  setTaskToEdit: (taskToEdit: Task | null) => void,
  setOpen: (open: boolean) => void
}