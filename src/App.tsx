import './App.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { AddTaskButton } from './components/add-task-button/AddTaskButton.tsx';
import { TaskComponents } from './components/task-components/TaskComponents.tsx';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f0f0f0ff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

interface Task {
  id: string,
  title: string,
  description: string,
  status: string,
  dueDate: Dayjs | null
}

function App() {
  const [taskData, setTaskData] = useState<Task[]>([]);

  const refreshTasks = async () => {
    const response = await fetch('http://localhost:3000/tasks');
    const data = await response.json();

    const parsedData = data.map((task: Task) => (
      {
        ...task,
        dueDate: task.dueDate ? dayjs(task.dueDate) : null
      }));

    setTaskData(parsedData);
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const tasks = [
    {
      id: 1,
      title: "Design UI",
      description: "Create wireframes",
      status: "Todo",
      dueDate: "2025-01-10",
    },
    {
      id: 2,
      title: "Build API",
      description: "Set up backend",
      status: "In Progress",
      dueDate: "2025-01-15",
    },
    {
      id: 3,
      title: "Testing",
      description: "Write tests",
      status: "Done",
      dueDate: "2025-01-05",
    },
  ];


  return (
    <div className='container'>
      <Item className='add-task-button'>
        <AddTaskButton refreshTasks={refreshTasks} />
      </Item>

      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Due Date</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                <Chip
                  label={task.status}
                  color={
                    task.status === "Done"
                      ? "success"
                      : task.status === "In Progress"
                      ? "warning"
                      : "default"
                  }
                  size="small"
                />
              </TableCell>
              <TableCell>{task.dueDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      <TaskComponents refreshTasks={refreshTasks} taskData={taskData} setTaskData={setTaskData} />

    </div>
  )
}

export default App
