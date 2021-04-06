import React from "react";
import { Modal, Grid, Button, Box } from "@material-ui/core";
import FriendList from "./FriendList";
import FriendSearch from "./FriendSearch";
import { makeStyles } from "@material-ui/core/styles";

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

function AddFriend() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <Grid container className={classes.modal} direction="column" spacing={3}>
      <Grid item>
        <h3 id="add-friend-modal-title" style={{ margin: 0 }}>
          Add Friends
        </h3>
      </Grid>
      <Grid item>
        <FriendSearch />
      </Grid>
      <Grid item>
        <FriendList variant="add_friend" />
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
