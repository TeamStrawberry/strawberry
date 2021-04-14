import React from 'react';
import { Grid,Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Trending from './Trending.jsx';
import New from './New.jsx';

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text,
    backgroundColor: theme.palette.background.paper,
    border: '10px solid',
    borderColor: theme.palette.text,
    padding: '5px',
    marginBottom: '16px'
  }
}))


const HomePage = ({loggedInUser, setLoginOpen}) => {
  const classes = useStyles();
  return (
    <div>
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      spacing = {3}
      >
      <Grid item xs={6}>
        <div>
          <h3> TRENDING</h3>
        <Trending
          loggedInUser={loggedInUser}
          setLoginOpen={setLoginOpen}
        />
        </div>
      </Grid>
      <Grid item xs = {6}>
      <div>
          <h3>NEW</h3>
        <New
          loggedInUser={loggedInUser}
          setLoginOpen={setLoginOpen}
        />
        </div>
      </Grid>
      </Grid>
    </div>
  )
}

export default HomePage;