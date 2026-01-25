import type { Task } from '../types/task';
import { api } from './api';
import dayjs from 'dayjs';

export type TaskStatus = 'TD' | 'IP' | 'D';
export type TaskField = 'title' | 'description' | 'status' | 'dueDate';

export const taskService = {
  getAll : async () => {
    const response = await api.get('/tasks');
    const data = response.data;

    return data
  },

  getAllParsed : async () => {
    try {
      const response = await api.get('/tasks');
      let data = response.data;

      data = data.map((task: Task) => ({
        ...task,
        dueDate: task.dueDate ? dayjs(task.dueDate) : null
      }));

      return data;
    } catch (error) {
      console.error('Failed to fetch tasks: ', error);
      throw error;
    }
  },

  getById : async (id: string) => {
    try {
      const response = await api.get(`/tasks/${id}`);
      const data = response.data;

      return data;
    } catch (error) {
      console.error('Failed to fetch task by id: ', error);
      throw error;
    }
  },

  create : async (task: Omit<Task, 'id'>) => {
    try {
      return await api.post('/tasks', {
        ...task,
        id: crypto.randomUUID()
      });
    } catch (error) {
      console.error('Failed to create task: ', error);
      throw error;
    }
  },

  update : async (id: string, task: Task) => {
    try {
      return await api.put(`/tasks/${id}`, task);
    } catch (error) {
      console.error('Failed to update task: ', error);
      throw error;
    }
  },

  updatePartial : async (id: string, updates: Partial<Task>) => {
    try {
      return await api.patch(`/tasks/${id}`, updates);
    } catch (error) {
      console.error('Failed to update task partially: ', error);
      throw error;
    }
  },

  updateField : async (id: string, task: Task, field: string, newValue: any) => {
    try {
      return await api.put(`/tasks/${id}`, {
        ...task,
        [field]: newValue
      });
    } catch (error) {
      console.error(`Failed to update task ${field}: `, error);
      throw error;
    }
  },

  updateStatus : async (id: string, task: Task, statusValue: string) => {
    try {
      return await api.put(`/tasks/${id}`, {
        ...task,
        status: statusValue
      });
    } catch (error) {
      console.error('Failed to update status: ', error);
      throw error;
    }
  },

  delete : async (id: string) => {
    try {
      return await api.delete(`/tasks/${id}`);
    } catch (error) {
      console.error('Failed to delete task: ', error);
      throw error;
    }
  },

  //function that will be used inside dialog
  saveTask : async (task: Task) => {
    try {
      if (task.id === '') {
        return await api.post('/tasks', {
          ...task,
          id: crypto.randomUUID()
        });
      }

      else {
        return await api.put(`/tasks/${task.id}`, task);
      }
    } catch (error) {
      console.error('Failed to save (create/update) task: ', error);
      throw error;
    }
  }
}
