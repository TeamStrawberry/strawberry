import React from "react";
import { Typography, Grid, Avatar, IconButton } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddIcon from "@material-ui/icons/Add";

function Friend({ friendName, variant }) {
  const icon = () => {
    if (variant === "add_friend") {
      return (
        <IconButton>
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
        <Avatar alt="FRIEND NAME" />
      </Grid>
      <Grid
        item
        container
        xs={8}
        direction="column"
        display="flex"
        justify="center"
      >
        <Typography variant="body1">{friendName}</Typography>
      </Grid>
      <Grid item container xs={2} direction="column" display="flex">
        {icon()}
      </Grid>
    </Grid>
  );
}

export default Friend;
