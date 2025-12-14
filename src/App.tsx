import './App.css'
import { TaskGrid } from './components/TaskGrid.tsx';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fde5e5',
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
          <Grid size={2}>
            <Item>
              <DeleteIcon />
            </Item>

            <Item>
              <EditIcon />
            </Item>
          </Grid>

          <Grid size="grow">
            <Item>
              <TaskGrid />
            </Item>
          </Grid>

          <Grid size="auto">
            <Item>
              <AddIcon /> Add Task
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default App
