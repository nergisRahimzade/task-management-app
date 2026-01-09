import type { Task } from "../typeTask"

export type FilterTasksProps = {
  refreshTasks: () => Promise<void>,
  chosenStatus: string,
  setChosenStatus: (value: React.SetStateAction<string>) => void,
  dialogComponentId: string,
  setDialogComponentId: (value: React.SetStateAction<string>) => void,
  selectedTask: Task | null,
  setSelectedTask: (value: React.SetStateAction<Task | null>) => void,
  taskToEdit: Task | null,
  setTaskToEdit: (value: React.SetStateAction<Task | null>) => void
}