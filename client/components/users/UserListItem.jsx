import React from "react";
import { Typography, Grid, Avatar, IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddIcon from "@material-ui/icons/Add";
import { createFriendship, removeFriendship } from "../../../api_master";
import CheckIcon from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme = theme) => ({
  checkMark: {
    color: 'green'
  }
}));

function UserListItem({
  loggedInUser,
  user,
  variant,
  refreshList,
  addChallenger,
  challengers,
}) {

  const classes = useStyles();

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
        <IconButton onClick={(e) => addChallenger(user)}>
          {challengers[user.id] ? <CheckIcon className={classes.checkMark}/> : <AddIcon />}
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
