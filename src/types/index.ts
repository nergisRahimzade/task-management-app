import type { Task } from './task.ts';

export type TaskDialogProps = {
  refreshTasks: () => Promise<void>,
  isEditOn: boolean,
  open: boolean,
  taskToEdit?: Task | null,
  setOpen: (value: React.SetStateAction<boolean>) => void
}

export type TaskFilterProps = {
  chosenStatus: string,
  setChosenStatus: (value: React.SetStateAction<string>) => void,
  setIsEditOn: (value: React.SetStateAction<boolean>) => void,
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
  setIsEditOn: (value: React.SetStateAction<boolean>) => void,
  setTaskToEdit: (value: React.SetStateAction<Task | null>) => void,
  setOpen: (value: React.SetStateAction<boolean>) => void
}

export type TaskListViewProps = {
  refreshTasks: () => Promise<void>,
  taskData: Task[],
  setDialogMode: (value: React.SetStateAction<boolean>) => void,
  setTaskToEdit: (value: React.SetStateAction<Task | null>) => void,
  setOpen: (value: React.SetStateAction<boolean>) => void
}