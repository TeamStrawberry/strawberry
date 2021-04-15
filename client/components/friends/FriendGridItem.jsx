import React from "react";
import { Typography, Grid, Avatar } from "@material-ui/core";

function FriendGridItem({ friend }) {
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
        <Avatar src={friend.avatar_url} alt="FRIEND NAME" />
      </Grid>
      <Grid container item xs={12} justify="center">
        <Typography variant="body2">{friend.username}</Typography>
      </Grid>
    </Grid>
  );
}

export default FriendGridItem;
