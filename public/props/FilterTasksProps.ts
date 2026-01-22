import type { Task } from "./task"

export type FilterTasksProps = {
  chosenStatus: string,
  setChosenStatus: (value: React.SetStateAction<string>) => void,
  setDialogComponentId: (value: React.SetStateAction<string>) => void,
  setTaskToEdit: (value: React.SetStateAction<Task | null>) => void,
  setOpen: (value: React.SetStateAction<boolean>) => void
}