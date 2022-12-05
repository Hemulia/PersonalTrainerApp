import './App.css';
import Customers from './Components/Customers';
import Trainings from './Components/Trainings';
import React, { useState } from 'react';
import { Toolbar, Tab, Tabs, AppBar } from '@mui/material';
import { ThemeProvider, createTheme} from '@mui/material/styles';
import { CgGym } from "react-icons/cg";

function App() {

  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {  
    setValue(value);
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: 'rgb(14, 27, 43)',
      },
    },
  });

  return (
    <div className="App" >
      <ThemeProvider theme={darkTheme}>
        <AppBar>
          <Toolbar style={{height:'90px', margin:'auto', fontSize:'xx-large',columnGap:'10px'}}>
            Personal Trainer
            <CgGym  style={{ color: 'rgb(190, 209, 15)'}}/>
          </Toolbar>
          <Tabs value={value} onChange={handleChange} centered style={{width:'100%', height:'55px', backgroundColor:"rgb(15, 31, 49)"}}>
            <Tab value="one" label="Customers" style={{color:"white"}}/>
            <Tab value="two" label="Trainings" style={{color:"white"}} />
          </Tabs>
            {value === 'one' && <div><Customers/></div>}
            {value === 'two' && <div><Trainings/></div>}
            </AppBar>
          </ThemeProvider>
    </div>
  );
}

export default App;
