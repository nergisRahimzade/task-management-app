import type { Task } from '../../public/typeTask.ts';
import { api } from './api.ts';

export const apiActionForDialog = (task: Task) => {
  let requestType = '';
  let fetchURL = '/tasks';

  if(task.id === '') {
    requestType = 'post';
  }

  else {
    requestType = 'put';
    fetchURL = fetchURL + `/${task.id}`;
  }

  if(requestType === 'post') {
    return api.post(fetchURL, {
      ...task,
      id: crypto.randomUUID()
    });
  }

  else {
    return api.put(fetchURL, {
      ...task
    });
  }

};