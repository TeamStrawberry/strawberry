import React from "react";
import { Typography, Grid, Avatar } from "@material-ui/core";

function FriendGridItem({ friendName }) {
  return (
    <Grid
      item
      container
      direction="row"
      spacing={1}
      justify="center"
      style={{ maxWidth: "97%" }}
    >
      <Grid container item xs={12} justify="center">
        <Avatar alt="FRIEND NAME" />
      </Grid>
      <Grid container item xs={12} justify="center">
        <Typography variant="body2">{friendName}</Typography>
      </Grid>
    </Grid>
  );
}

export default FriendGridItem;
