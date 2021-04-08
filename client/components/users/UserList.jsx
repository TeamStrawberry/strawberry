import React from "react";
import { Grid } from "@material-ui/core";
import UserListItem from "./UserListItem.jsx";
import friendSampleData from "../friends/friendSampleData";

function UserList({ variant, list }) {
  list = list.map((user) => {
    return (
      <Grid item>
        <UserListItem username={user.username} variant={variant} />
      </Grid>
    );
  });

  return (
    <Grid
      container
      style={{ maxHeight: "25vh", overflowX: "auto", overflowY: "scroll" }}
    >
      <Grid container direction="column" style={{ margin: 0, width: "100%" }}>
        {list}
      </Grid>
    </Grid>
  );
}

export default UserList;
