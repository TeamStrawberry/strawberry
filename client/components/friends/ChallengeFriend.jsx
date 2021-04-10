import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Modal,
  Grid,
  Button,
  TextField,
  Typography,
  Avatar,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton'
import UserList from "../users/UserList";
import UserSearch from "../users/UserSearch";
import { sendFriendEmail } from "../../../api_master";

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
  iconClose: {
    "&:hover $icon": {
      color: 'red',
    },
    position: "absolute",
    top: '1%',
    left: '1%'
  },
  icon: {
    color: 'black',
  },
}));

function ChallengeFriend({ loggedInUser, friends, link = "https://www.youtube.com/", score = 0 }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [challengees, setChallengees] = useState([]);
  const [toChallenge, updateToChallenge] = useState([]);
  const [challengeMessage, updateMessage] = useState('I challenge you');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const challengeGroup = (
    <AvatarGroup max={5} className={classes.small}>
      {challengees.map((friend) => {
        return (
          <Avatar
            key={friend.id}
            alt={friend.username}
            className={classes.small}
          />
        );
      })}
    </AvatarGroup>
  );

  const addChallengers = (friend) => {
    updateToChallenge([friend]);
  }

  const challengeFriends = (friends) => {
    for (let userId in friends[0]) {
      let friend = friends[0][userId].username;
      let friendEmail = friends[0][userId].email;
      let user = loggedInUser.username;
      let safeLink = encodeURIComponent(link);

      sendFriendEmail(friend, user, friendEmail, challengeMessage, score, safeLink);
    }
  }

  const updateUserMessage = (e) => {
    updateMessage(e);
  }

  const body = (
    <Grid container className={classes.modal} direction="column" spacing={3}>
      <Grid item>
        <IconButton
            classes={{
              root: classes.iconClose
          }}
          onClick={e => handleClose()}
        >
          <ClearIcon className={classes.icon}/>
        </IconButton>

      </Grid>
      <Grid item>
        <h2 id="challenge-modal-title" style={{ margin: 0 }}>
          Challenge Your Friends
        </h2>
      </Grid>
      <Grid item>
        <UserSearch />
      </Grid>
      <Grid item>
        <UserList
          loggedInUser={loggedInUser}
          variant="challenge"
          list={friends}
          addChallengers={addChallengers}
        />
      </Grid>
      <Grid item>
        <TextField
          id="outlined-multiline-static"
          label="Message"
          multiline
          rows={4}
          placeholder="Talk some trash..."
          variant="outlined"
          fullWidth
          onChange={e => updateUserMessage(e.target.value)}
        />
      </Grid>
      <Grid item container direction="column" justify="center" spacing={5}>
        <Grid item container direction="row" justify="center">
          <Grid item xs={4}>
            {challengeGroup}
          </Grid>
          <Grid container item xs={8} justify="flex-end">
            <Button variant="contained" color="primary" onClick={e => {challengeFriends(toChallenge), handleClose()}}>
              Send Challenge Email
            </Button>
          </Grid>
        </Grid>
        <Grid item container justify="center">
          <Typography>-OR-</Typography>
        </Grid>
        <Grid item container direction="row" spacing={2}>
          <Grid item xs={9}>
            <TextField
              id="challenge-link"
              defaultValue={link}
              varian="standard"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid container item xs={3} display="flex" justify="flex-end">
            <Button
              onClick={handleClose}
              size="small"
              color="secondary"
              variant="outlined"
              style={{ fontSize: 10 }}
            >
              Copy Link
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Box>
      <Button variant="outlined" onClick={handleOpen} size="small">
        Challenge Friend
      </Button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </Box>
  );
}

export default ChallengeFriend;
