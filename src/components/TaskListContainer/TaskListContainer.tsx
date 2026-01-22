import { TaskComponent } from '../TaskComponent/TaskComponent';
import { Header } from '../Header/Header.tsx';
import type { TaskListProps } from '../../../public/props/TaskListProps.ts';

export function TaskListContainer({refreshTasks, taskData, dialogComponentId, setDialogComponentId, setTaskToEdit, setOpen}: TaskListProps) {
  return (
    <>
      <Header />

      <TaskComponent
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