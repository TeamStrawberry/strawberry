import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import FriendGrid from "../friends/FriendGrid";
import ChallengeFriend from "../friends/ChallengeFriend";
import UserAvatar from "./UserAvatar";
import UserStats from "./UserStats";
import UserRankings from "./UserRankings";
import UserQuizHistoryTaken from "./UserQuizHistoryTaken";
import UserQuizHistoryCreated from "./UserQuizHistoryCreated";

function UserProfile() {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item container direction="row" spacing={3} justify="center">
        <Grid item>
          <Typography>Mike's Components for Testing</Typography>
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
          xs={5}
          container
          direction="column"
          display="flex"
          spacing={2}
        >
          <UserStats />
          <UserRankings />
        </Grid>
        <Grid
          item
          xs={5}
          container
          direction="column"
          display="flex"
          spacing={2}
        >
          <UserQuizHistoryTaken />
          <UserQuizHistoryCreated />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserProfile;
