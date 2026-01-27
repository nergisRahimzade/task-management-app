import { TaskItem } from '../TaskItem/TaskItem.tsx';

import type { TaskListViewProps } from '../../types/index.ts';

export function TaskListView({refreshTasks, taskData, setIsEditOn, setTaskToEdit, setOpen}: TaskListViewProps) {
  return (
    <>
      <TaskItem
        refreshTasks={refreshTasks}
        taskData={taskData}
        setIsEditOn={setIsEditOn}
        setTaskToEdit={setTaskToEdit}
        setOpen={setOpen}
      />
    </>
  );
}