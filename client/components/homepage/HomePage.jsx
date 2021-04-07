import React from 'react';
import { Grid } from "@material-ui/core";
import Trending from './Trending.jsx';
import New from './New.jsx';

const HomePage = () => {

  return (
    <div>
      <Grid>
      <Grid item xs={6}>
      <Trending />
      </Grid>
      <Grid item xs ={6}>
      <New/>
      </Grid>
      </Grid>
    </div>
  )
}

export default HomePage;