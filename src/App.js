import React from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Calendar from './components/Calendar'

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


 
function TabPanel(props) { 
/* I wanna do drawer menu instead of tabs...   return (
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
   */
  const { children, value, index, ...other } = props;

  return (
    
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1100,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (

    <div className={classes.root}>
      <AppBar position="static" style={{ background: '#F08080'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Customers" {...a11yProps(0)} />
          <Tab label="Trainings" {...a11yProps(1)} />
          <Tab label="Calendar" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Customerlist />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Traininglist />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Calendar />
        </TabPanel>
      </SwipeableViews>
    </div> 



  );
}
  


