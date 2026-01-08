import { TaskComponents } from '../task-components/TaskComponents';
import { Header } from '../header/Header.tsx';
import type { TaskListProps } from '../../../public/props/TaskListProps.ts';

export function TaskList({refreshTasks, taskData, setTaskData, chosenStatus}: TaskListProps) {
  return (
    <>
      <Header />

      <TaskComponents
        refreshTasks={refreshTasks}
        taskData={taskData}
        setTaskData={setTaskData}
        chosenStatus={chosenStatus}
      />
    </>
  );
}