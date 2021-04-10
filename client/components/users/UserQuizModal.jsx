import React, { useState, useEffect } from 'react';
import { Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CreatedQuizHistory from '../quizeditor/CreatedQuizHistory.jsx';
import { theme } from '../../theme.js';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
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

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      maxHeight: '50%',
      overflowY: 'auto',
      border: '3px solid',
      borderColor: theme.palette.secondary.main
  };
}

const useStyles = makeStyles(theme => ({
  // modal: {
  //     display: 'flex',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  // },
  root: {
    width: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
      position: 'absolute',
      width: 'auto',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
  },
}));

const UserQuizModal = ({userId}) => {

  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };

  let tempUserId = 1;

  return(
    <div className = {classes.paper} style = {modalStyle}>
      <div className = {classes.root}>
        <AppBar position = 'static'>
          <Tabs value = {value} onChange = {handleChange} variant = 'fullWidth'>
            <Tab label = 'Quizzes Created' {...a11yProps(0)}/>
            <Tab label = 'Quizzes Taken' {...a11yProps(1)}/>
          </Tabs>
        </AppBar>
        <TabPanel value = {value} index = {0}>
          <CreatedQuizHistory />
        </TabPanel>
        <TabPanel value = {value} index = {1}>
          <h1 className = 'quizzes-created-heading'>I am Alex</h1>
        </TabPanel>
      </div>
    </div>
  )
};

export default UserQuizModal;