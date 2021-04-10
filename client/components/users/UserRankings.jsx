import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, CardHeader } from "@material-ui/core";
import { getOverallRankings } from "../../../api_master";

function UserRankings({ loggedInUser }) {
  const [rankings, setRankings] = useState({});

  var refreshRankings = () => {
    if (loggedInUser.id) {
      getOverallRankings(loggedInUser.id).then((res) => {
        setRankings(res.data);
      });
    }
  };
  refreshRankings = refreshRankings.bind(this);

  useEffect(() => {
    refreshRankings();
    return () => {
      setRankings({});
    };
  }, []);

  return (
    <Grid item xs>
      <Card style={{ height: "100%" }}>
        <CardHeader
          title="Rankings"
          titleTypographyProps={{ variant: "body2" }}
          style={{ padding: 10 }}
        />
        <CardContent>
          <p>{`friendRank ${rankings.friendRank}`}</p>
          <p>{`friendPercentile ${rankings.friendPercentile}`}</p>
          <p>{`globalRank ${rankings.globalRank}`}</p>
          <p>{`globalPercentile ${rankings.globalPercentile}`}</p>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default UserRankings;
