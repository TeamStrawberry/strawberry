import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import UserListItem from "./UserListItem.jsx";

function UserList({ loggedInUser, variant, list, refreshList, addChallengers }) {
  const [challengers, updateChallengers] = useState({});

  const addChallenger = user => {
    const copyOfChallengers = { ...challengers };
    const updatedValue = {};
    updatedValue[user.id] = user;

    if (copyOfChallengers[user.id]) {
      delete copyOfChallengers[user.id];
      return updateChallengers({ ...copyOfChallengers })
    }

    updateChallengers({...copyOfChallengers, ...updatedValue});
  }

  useEffect(() => {
    if (addChallengers) addChallengers(challengers);
  }, [challengers])

  list = list.map((user) => {
    return (
      <Grid item key={user.id}>
        <UserListItem
          loggedInUser={loggedInUser}
          user={user}
          variant={variant}
          refreshList={refreshList}
          addChallenger={addChallenger}
          challengers={challengers}
        />
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
