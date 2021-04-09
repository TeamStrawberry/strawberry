import React from 'react';
import { Grid } from "@material-ui/core";
import Trending from './Trending.jsx';
import New from './New.jsx';

const HomePage = () => {

  return (
    <div>
      <Grid>
      <Grid item xs={12}>
        <div style={{width:'50%'}}>
          <h3> TRENDING</h3>
        <Trending />
        </div>
        <div style={{width:'50%'}}>
          <h3>NEW</h3>
        <New/>
        </div>
      </Grid>
      </Grid>
    </div>
  )
}

export default HomePage;