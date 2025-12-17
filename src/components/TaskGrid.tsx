import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { TaskComponents } from './task-components/TaskComponents';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#3197fdff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export function TaskGrid() {
  return (
    /*
    <>
    <table width={100%}>
      <tr>
        <th>Title</th>
        <th>Desription</th>
        <th>Status</th>
        <th>Due Date</th>
      </tr>

      <tr>
        <TaskComponents />
      </tr>
    </table>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid size="grow">
            <Item>Title</Item>
          </Grid>

          <Grid size={6}>
            <Item>Description</Item>
          </Grid>

          <Grid size={2}>
            <Item>Status</Item>
          </Grid>

          <Grid size={2}>
            <Item>Due Date</Item>
          </Grid>

        </Grid>
      </Box>
    </>
    */
   <></>

  );
}