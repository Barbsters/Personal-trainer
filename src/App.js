import React from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



function App() {
  return (
    <div className="App">
      <AppBar position="static" style={{ background: '#F08080'}}>
        <Toolbar>
          <Typography variant="h6">
            Barbster Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>

      <Customerlist />
    </div>
  );
}


export default App;
