import React from 'react';
import { Grid } from "@material-ui/core";
import Trending from './Trending.jsx';
import New from './New.jsx';



const HomePage = ({loggedInUser, setLoginOpen}) => {
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