import React from "react";
import friendSampleData from "./friendSampleData";
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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    justify: "center",
  },
});

function FriendGrid() {
  let friends = friendSampleData.map((friend) => {
    return (
      <Grid item>
        <FriendGridItem friendName={friend.name} />
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
                {friends[0]}
                {friends[1]}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                {friends[2]}
                {friends[3]}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                {friends[4]}
                {friends[5]}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                {friends[6]}
                {friends[7]}
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
              <AddFriend />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default FriendGrid;
