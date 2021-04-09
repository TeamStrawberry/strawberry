import React from "react";
import { Typography, Grid, Avatar, IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddIcon from "@material-ui/icons/Add";
import { createFriendship, removeFriendship } from "../../../api_master";

function UserListItem({ loggedInUser, user, variant, refreshList }) {
  const icon = () => {
    if (variant === "add_friend") {
      return (
        <IconButton
          onClick={() =>
            createFriendship(loggedInUser.id, user.id).then(refreshList)
          }
        >
          <PersonAddIcon />
        </IconButton>
      );
    }

    if (variant === "challenge") {
      return (
        <IconButton>
          <AddIcon />
        </IconButton>
      );
    }

    if (variant === "show_friends") {
      return (
        <IconButton
          onClick={() =>
            removeFriendship(loggedInUser.id, user.id).then(refreshList)
          }
        >
          <DeleteForeverIcon />
        </IconButton>
      );
    }
  };

  return (
    <Grid
      item
      container
      direction="row"
      spacing={1}
      style={{ marginLeft: 5, marginRight: 5, maxWidth: "97%" }}
    >
      <Grid item container xs={2}>
        <Avatar alt="user name" />
      </Grid>
      <Grid
        item
        container
        xs={8}
        direction="column"
        display="flex"
        justify="center"
      >
        <Typography variant="body1">{user.username}</Typography>
      </Grid>
      <Grid item container xs={2} direction="column" display="flex">
        {icon()}
      </Grid>
    </Grid>
  );
}

export default UserListItem;
