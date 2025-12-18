import { useState, useEffect, useRef } from 'react';

import { Button, TextField } from '@mui/material';
import './TaskComponents.css';

import deleteIcon from '../../assets/icons/delete-icon.png';
import editIcon from '../../assets/icons/edit-icon.png';


// Define the type for your task
interface Task {
  id: any;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

interface TaskComponentsProps {
  taskData: Task[],
  setTaskData: React.Dispatch<React.SetStateAction<Task[]>>,
  refreshTasks: () => Promise<void>
}

//isonfetch

export function TaskComponents({ taskData, setTaskData, refreshTasks }: TaskComponentsProps) {
  const dialogElement = useRef<HTMLDialogElement>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: '',
    dueDate: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/tasks');
      const data = await response.json();
      setTaskData(data);
    };

    fetchData();
  }, []);

  const handleDelete = async (deletedTask: Task): Promise<void> => {
    await fetch((`http://localhost:3000/tasks/${deletedTask.id}`), {
      method: 'DELETE'
    });

    refreshTasks();
  };

  const handleEdit = async (updatedTask: Task): Promise<void> => {
    setEditingTaskId(updatedTask.id);
    await setTask(updatedTask);
    setShowEditForm(true);
    handleShowModal();
  };

  const handleUpdatedTask = (event: any) => {
    setTask({ ...task, [event?.target.name]: event.target.value });
  };

  const handleStatusChange = async (taskItem: Task, newStatus: string) => {
    //update backend
    await fetch(`http://localhost:3000/tasks/${taskItem.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...taskItem,
        status: newStatus
      })
    });

    refreshTasks();
  };

  const handleSubmit = async (editingTaskId: any) => {
    await fetch(`http://localhost:3000/tasks/${editingTaskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editingTaskId,
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate
      })
    });

    handleCloseModal();
    setEditingTaskId(null);
    setShowEditForm(false);
    refreshTasks();
  };

  const handleShowModal = () => {
    if (dialogElement.current)
      dialogElement.current.showModal();
  }

  const handleCloseModal = () => {
    if (dialogElement.current)
      dialogElement.current.close();
  }


  return (
    <>
      {taskData.map((taskItem) => (
        <div className='tasks-container'>
          <TaskChangeButtons handleDelete={handleDelete} handleEdit={handleEdit} taskItem={taskItem} />

          <div className='taskItems-container'>
            <div className='title'>
              {taskItem.title}
            </div>

            <div className='description'>
              {taskItem.description}
            </div>

            <div className='status'>
              <select
                id='status'
                name='status'
                value={taskItem.status}
                onChange={(event) => handleStatusChange(taskItem, event.target.value)}
              >
                <option value=''>Select</option>
                <option value='TD'>TD</option>
                <option value='IP'>IP</option>
                <option value='D'>D</option>
              </select>
            </div>

            <div className='due-date'>
              {taskItem.dueDate}
            </div>
          </div>



          {(
            <>
              <dialog ref={dialogElement}>
                <TextField
                  id="outlined-basic"
                  label="Title"
                  name='title'
                  value={task.title}
                  onChange={handleUpdatedTask}
                >
                </TextField>

                <TextField
                  id='outlined-multiline-static'
                  label='Description'
                  name='description'
                  value={task.description}
                  multiline
                  rows={5}
                  onChange={handleUpdatedTask}
                >
                </TextField>

                <TextField
                  id='outlined-basic'
                  label='Due Date'
                  name='dueDate'
                  value={task.dueDate}
                  onChange={handleUpdatedTask}
                >
                </TextField>

                <Button
                  variant='contained'
                  onClick={() => { handleSubmit(editingTaskId) }}
                >
                  Done
                </Button>

                <Button
                  variant='contained'
                  onClick={() => { setEditingTaskId(null) }}
                >
                  Cancel
                </Button>

              </dialog>
            </>
          )}
        </div>
      ))}

    </>
  );
}

interface TaskComponentsProps {
  taskData: Task[],
  setTaskData: React.Dispatch<React.SetStateAction<Task[]>>,
  refreshTasks: () => Promise<void>
}

interface TaskChangeButtonsProps {
  handleDelete: (updatedTask: Task) => void | Promise<void>,
  handleEdit: (updatedTask: Task) => void | Promise<void>,
  taskItem: Task
}

export function TaskChangeButtons({ handleDelete, handleEdit, taskItem }: TaskChangeButtonsProps) {
  return (
    <>
      <div className='task-change-buttons-container'>
        <button className='task-change-buttons-delete' onClick={() => { handleDelete(taskItem) }}>
          <img src={deleteIcon} className='task-change-buttons-icons' />
        </button>

        <button className='task-change-buttons-edit' onClick={() => { handleEdit(taskItem) }}>
          <img src={editIcon} className='task-change-buttons-icons' />
        </button>
      </div>
    </>
  );
}