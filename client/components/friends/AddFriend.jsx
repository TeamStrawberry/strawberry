import React, { useState, useEffect } from "react";
import { Modal, Grid, Button, Box } from "@material-ui/core";
import UserList from "../users/UserList";
import UserSearch from "../users/UserSearch";
import { makeStyles } from "@material-ui/core/styles";
import { getStrangers } from "../../../api_master";

const useStyles = makeStyles((theme = theme) => ({
  modal: {
    position: "absolute",
    width: "50%",
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

function AddFriend({ userId = 2 }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [strangers, setStrangers] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getStrangers(userId).then((res) => {
      setStrangers(res.data.rows);
    });
    return () => {
      setStrangers([]);
    };
  }, []);

  const body = (
    <Grid container className={classes.modal} direction="column" spacing={3}>
      <Grid item>
        <h3 id="add-friend-modal-title" style={{ margin: 0 }}>
          Add Friends
        </h3>
      </Grid>
      <Grid item>
        <UserSearch />
      </Grid>
      <Grid item>
        <UserList variant="add_friend" list={strangers} />
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
      <Button variant="outlined" onClick={handleOpen} size="small">
        Add Friend
      </Button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </Box>
  );
}

export default AddFriend;
