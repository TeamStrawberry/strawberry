import React from "react";
import FriendGridItem from "./FriendGridItem";
import AddFriend from "../friends/AddFriend";
import {
  Grid,
  Link,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function FriendGrid({ loggedInUser, friends }) {
  let friendGridItems = friends.map((friend) => {
    return (
      <Grid item>
        <FriendGridItem friendName={friend.username} />
      </Grid>
    );
  });

  return (
    <Grid item container direction="column">
      <Card>
        <CardHeader
          title="Friends"
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
              <Link src="#">See all</Link>
            </Grid>
            <Grid item>
              <AddFriend loggedInUser={loggedInUser} friends={friends} />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default FriendGrid;
