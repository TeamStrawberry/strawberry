import React from "react";
import { Grid } from "@material-ui/core";
import Friend from "./Friend.jsx";

const dummyData = [
  { name: "Mike" },
  { name: "John" },
  { name: "Cindy" },
  { name: "Harshin" },
  { name: "Daniel" },
  { name: "Lukas" },
  { name: "Helen" },
];

function FriendList({ variant }) {
  let friends = dummyData.map((friend) => {
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
