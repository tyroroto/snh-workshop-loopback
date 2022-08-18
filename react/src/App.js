import logo from './logo.svg';
import './App.css';
import { Box, Grid } from '@mui/material';
import BmiBox from 'BmiBox';

function App() {
  return (
    <div className="App">
      <div className="">
        <Grid container>
          <Grid item md={6} xs={12}>
            <Box sx={{}}>
              <h1> BMI Cal </h1>
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <Box sx={{}}>
              <BmiBox/>
            </Box>
          </Grid>
        </Grid>
      </div>

    </div>
  );
}

export default App;
