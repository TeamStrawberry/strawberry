import React, { useState, useEffect } from "react";
import FriendGridItem from "./FriendGridItem";
import AddFriend from "../friends/AddFriend";
import SeeAllFriends from "../friends/SeeAllFriends";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@material-ui/core";

function FriendGrid({ loggedInUser, friends, refreshFriends }) {
  const [friendGridItems, setFriendGrid] = useState([]);
  const [loading, setLoading] = useState(true);

  var refreshGrid = () => {
    refreshFriends().then(() => {
      var newFriendGrid = friends.map((friend) => {
        return (
          <Grid item>
            <FriendGridItem friendName={friend.username} />
          </Grid>
        );
      });
      setFriendGrid(newFriendGrid);
    });
  };

  useEffect(() => {
    if (!!loggedInUser && loading) {
      setLoading(false);
    } else if (!loading) {
      refreshGrid();
    }
  }, [friends, loading]);

  return (
    <Grid item container direction="column">
      <Card>
        <CardHeader
          title={`Friends (${friends.length})`}
          titleTypographyProps={{ variant: "body2" }}
          style={{ padding: 10 }}
        />
        <CardContent>
          <Grid item container direction="row" spacing={1}>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                {friendGridItems[0]}
                {friendGridItems[1]}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                {friendGridItems[2]}
                {friendGridItems[3]}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                {friendGridItems[4]}
                {friendGridItems[5]}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                {friendGridItems[6]}
                {friendGridItems[7]}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container direction="column" align="center" spacing={1}>
            <Grid item>
              <SeeAllFriends
                loggedInUser={loggedInUser}
                friends={friends}
                refresh={refreshGrid}
              />
            </Grid>
            <Grid item>
              <AddFriend loggedInUser={loggedInUser} refresh={refreshGrid} />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default FriendGrid;
