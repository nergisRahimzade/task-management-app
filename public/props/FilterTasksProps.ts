export type FilterTasksProps = {
  refreshTasks: () => Promise<void>,
  chosenStatus: string,
  setChosenStatus: (value: React.SetStateAction<string>) => void
}