import { TaskComponents } from '../task-components/TaskComponents';
import { Header } from '../header/Header.tsx';
import type { TaskListProps } from '../../../public/props/TaskListProps.ts';

export function TaskList({refreshTasks, taskData, chosenStatus, dialogComponentId, setDialogComponentId, selectedTask, setSelectedTask, setTaskToEdit, setOpen}: TaskListProps) {
  return (
    <>
      <Header />

      <TaskComponents
        refreshTasks={refreshTasks}
        taskData={taskData}
        chosenStatus={chosenStatus}
        dialogComponentId={dialogComponentId}
        setDialogComponentId={setDialogComponentId}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        setTaskToEdit={setTaskToEdit}
        setOpen={setOpen}
      />
    </>
  );
}