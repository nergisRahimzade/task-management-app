import { TaskComponents } from '../task-components/TaskComponents';
import { Header } from '../header/Header.tsx';
import type { TaskListProps } from '../../../public/props/TaskListProps.ts';

export function TaskList({refreshTasks, taskData, dialogComponentId, setDialogComponentId, setTaskToEdit, setOpen}: TaskListProps) {
  return (
    <>
      <Header />

      <TaskComponents
        refreshTasks={refreshTasks}
        taskData={taskData}
        dialogComponentId={dialogComponentId}
        setDialogComponentId={setDialogComponentId}
        setTaskToEdit={setTaskToEdit}
        setOpen={setOpen}
      />
    </>
  );
}