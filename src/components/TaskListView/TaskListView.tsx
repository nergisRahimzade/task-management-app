import { TaskItem } from '../TaskItem/TaskItem.tsx';
import { Header } from '../Header/Header.tsx';

import type { TaskListViewProps } from '../../types/index.ts';

export function TaskListView({refreshTasks, taskData, dialogComponentId, setDialogComponentId, setTaskToEdit, setOpen}: TaskListViewProps) {
  return (
    <>
      <Header />

      <TaskItem
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