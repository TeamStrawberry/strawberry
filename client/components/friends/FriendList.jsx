import React from "react";
import { Grid } from "@material-ui/core";
import Friend from "./Friend.jsx";
import friendSampleData from "./friendSampleData";

function FriendList({ variant }) {
  let friends = friendSampleData.map((friend) => {
    return (
      <Grid item>
        <Friend friendName={friend.name} variant={variant} />
      </Grid>
    );
  });

  return (
    <Grid
      container
      style={{ maxHeight: "25vh", overflowX: "auto", overflowY: "scroll" }}
    >
      <Grid container direction="column" style={{ margin: 0, width: "100%" }}>
        {friends}
      </Grid>
    </Grid>
  );
}

export default FriendList;