import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
    width: "100%",
    borderRadius: "50%",
    maxWidth: "100px",
  },
});

function UserAvatar({ loggedInUser }) {
  const classes = useStyles();

  return (
    <Grid item>
      <Card className={classes.root}>
        <Grid container direction="column" align="center">
          <Grid item>
            <CardMedia
              className={classes.media}
              image="https://hungrygen.com/wp-content/uploads/2019/11/placeholder-male-square.png"
              title="INSERT TITLE"
              style={{ marginTop: 10 }}
            />
          </Grid>
          <CardContent style={{ padding: 0, margin: 10 }}>
            <Typography variant="h5" component="h2">
              {loggedInUser.username}
            </Typography>
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  );
}

export default UserAvatar;
