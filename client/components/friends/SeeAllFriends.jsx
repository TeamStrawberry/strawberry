import React, { useState, useEffect } from "react";
import { Modal, Grid, Button, Box, Link } from "@material-ui/core";
import UserList from "../users/UserList";
import UserSearch from "../users/UserSearch";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme = theme) => ({
  modal: {
    position: "absolute",
    width: "50%",
    minHeight: "50vh",
    backgroundColor: theme.palette.background.paper,
    border: "5px solid",
    borderColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  },
}));

function SeeAllFriends({ loggedInUser, friends, refresh }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchTerm, setSearchTerm] = useState("");

  var handleSearch = (searchTerm) => {
    if (searchTerm.length > 2) {
      setSearchTerm(searchTerm);
    } else {
      setSearchTerm("");
    }
    return;
  };

  var filteredFriends = friends
    .filter((u) => u.username.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0);

  const body = (
    <Grid container className={classes.modal} direction="column" spacing={3}>
      <Grid item>
        <h3 id="add-friend-modal-title" style={{ margin: 0 }}>
          My friends
        </h3>
      </Grid>
      <Grid item>
        <UserSearch handleSearch={handleSearch} />
      </Grid>
      <Grid item>
        <UserList
          loggedInUser={loggedInUser}
          variant="show_friends"
          list={filteredFriends}
          refreshList={refresh}
        />
      </Grid>
      <Grid item container justify="center">
        <Button
          variant="contained"
          variant="outlined"
          color="primary"
          onClick={handleClose}
        >
          Done
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <Box>
      <Link onClick={handleOpen} style={{ cursor: "pointer" }}>
        See all
      </Link>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </Box>
  );
}

export default SeeAllFriends;
