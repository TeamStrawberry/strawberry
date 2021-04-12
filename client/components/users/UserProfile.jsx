import React, { useState, useEffect } from "react";
import FriendGrid from "../friends/FriendGrid";
import UserAvatar from "./UserAvatar";
import UserStats from "./UserStats";
import UserRankings from "./UserRankings";
import UserQuizHistoryCreated from "./UserQuizHistoryCreated";
import { getFriends } from "../../../api_master";
import { Grid } from "@material-ui/core";

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
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={2}
      style={{ marginTop: 10 }}
    >
      <Grid item container direction="row" spacing={2} justify="center">
        <Grid item xs={2} container direction="column" spacing={2}>
          <UserAvatar loggedInUser={loggedInUser} />
          <FriendGrid
            loggedInUser={loggedInUser}
            friends={friends}
            refreshFriends={refreshFriends}
          />
        </Grid>
        <Grid item xs={10} container direction="column" spacing={2}>
          <Grid item>
            <UserStats loggedInUser={loggedInUser} />
          </Grid>
          <Grid item>
            <UserRankings loggedInUser={loggedInUser} friends={friends} />
          </Grid>
        </Grid>

        <UserQuizHistoryCreated loggedInUser={loggedInUser} friends={friends} />
      </Grid>
    </Grid>
  );
}

export default UserProfile;
