import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import FriendGrid from "../friends/FriendGrid";
import AddFriend from "../friends/AddFriend";
import ChallengeFriend from "../friends/ChallengeFriend";
import UserAvatar from "./UserAvatar";
import UserStats from "./UserStats";
import UserRankings from "./UserRankings";

function UserProfile() {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item container direction="row" spacing={3} justify="center">
        <Grid item>
          <Typography>Mike's Components for Testing</Typography>
        </Grid>
        <Grid item>
          <AddFriend />
        </Grid>
        <Grid item>
          <ChallengeFriend />
        </Grid>
      </Grid>
      <Grid item container direction="row" spacing={2} justify="center">
        <Grid item xs={2} container direction="column" spacing={2}>
          <UserAvatar />
          <FriendGrid />
        </Grid>
        <Grid
          item
          xs={10}
          container
          direction="column"
          display="flex"
          spacing={2}
        >
          <UserStats />
          <UserRankings />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserProfile;
