import type { Task } from "../../public/typeTask";
import { api } from './api.ts';

export function updateChanges(task: Task, newValue: any, keyword: string) {
  if (keyword === 'title')
    return api.put(`/tasks/${task.id}`, {
      ...task,
      title: newValue
    });

  else if (keyword === 'description')
    return api.put(`/tasks/${task.id}`, {
      ...task,
      description: newValue
    });

  else
    return api.put(`/tasks/${task.id}`, {
      ...task,
      dueDate: newValue
    });
}
