import './App.css'
import { TaskGrid } from './components/TaskGrid.tsx';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { TaskChangeButtons } from './components/task-change-buttons/TaskChangeButtons.tsx';
import { AddTaskButton } from './components/add-task-button/AddTaskButton.tsx';
import { TaskComponents } from './components/task-components/TaskComponents.tsx';
import { Route } from '@mui/icons-material';

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

function App() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size="grow">
            <Item>
              <TaskGrid />
            </Item>

            <Grid size="grow">
              <Item>
                <TaskComponents />
              </Item>
            </Grid>

          </Grid>

          <Grid size="auto">
            <Item>
              <AddTaskButton />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default App
