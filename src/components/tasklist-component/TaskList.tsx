import { TaskComponents } from '../task-components/TaskComponents';
import { Header } from '../header/Header.tsx';
import type { TaskListProps } from '../../../public/props/TaskListProps.ts';

export function TaskList({refreshTasks, taskData, setTaskData, chosenStatus, dialogComponentId, setDialogComponentId, selectedTask, setSelectedTask, taskToEdit, setTaskToEdit}: TaskListProps) {
  return (
    <>
      <Header />

      <TaskComponents
        refreshTasks={refreshTasks}
        taskData={taskData}
        setTaskData={setTaskData}
        chosenStatus={chosenStatus}
        dialogComponentId={dialogComponentId}
        setDialogComponentId={setDialogComponentId}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        taskToEdit={taskToEdit}
        setTaskToEdit={setTaskToEdit}
      />
    </>
  );
}