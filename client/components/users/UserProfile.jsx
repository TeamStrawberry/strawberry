import React, { useState, useEffect } from "react";
import FriendGrid from "../friends/FriendGrid";
import ChallengeFriend from "../friends/ChallengeFriend";
import UserAvatar from "./UserAvatar";
import UserStats from "./UserStats";
import UserRankings from "./UserRankings";
import UserQuizHistoryTaken from "./UserQuizHistoryTaken";
import UserQuizHistoryCreated from "./UserQuizHistoryCreated";
import { getFriends } from "../../../api_master";
import { Box, Grid, Typography } from "@material-ui/core";

function UserProfile({ loggedInUser = { id: 1, username: "admin" } }) {
  const [friends, setFriends] = useState([]);

  var refreshFriends = () => {
    return getFriends(loggedInUser.id).then((res) => {
      if (JSON.stringify(friends) !== JSON.stringify(res.data.rows)) {
        setFriends(res.data.rows);
      }
    });
  };
  refreshFriends = refreshFriends.bind(this);

  useEffect(() => {
    refreshFriends();
    return () => {
      setFriends([]);
    };
  }, []);

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item container direction="row" spacing={3} justify="center">
        <Grid item>
          <Typography>Mike's Components for Testing</Typography>
        </Grid>
        <Grid item>
          <ChallengeFriend loggedInUser={loggedInUser} friends={friends} />
        </Grid>
      </Grid>
      <Grid item container direction="row" spacing={2} justify="center">
        <Grid item xs={2} container direction="column" spacing={2}>
          <UserAvatar loggedInUser={loggedInUser} />
          <FriendGrid
            loggedInUser={loggedInUser}
            friends={friends}
            refreshFriends={refreshFriends}
          />
        </Grid>
        <Grid
          item
          xs={5}
          container
          direction="column"
          display="flex"
          spacing={2}
        >
          <UserStats loggedInUser={loggedInUser} />
          <UserRankings loggedInUser={loggedInUser} />
        </Grid>
        {/* <Grid
          item
          xs={5}
          container
          direction="column"
          display="flex"
          spacing={2}
        >

        </Grid> */}
         <UserQuizHistoryTaken />
          <UserQuizHistoryCreated
            loggedInUser = {loggedInUser}
            friends={friends}
          />
      </Grid>
    </Grid>
  );
}

export default UserProfile;
