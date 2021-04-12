import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, CardHeader } from "@material-ui/core";
import { getOverallRankings } from "../../../api_master";
import { ordinalSuffix } from "../../../helperFunctions";
import KPI from "./KPI";

function UserRankings({ loggedInUser, friends }) {
  const [rankings, setRankings] = useState({});

  var refreshRankings = () => {
    if (loggedInUser.id && friends) {
      getOverallRankings(loggedInUser.id).then((rankings) => {
        setRankings(rankings.data);
      });
    }
  };
  refreshRankings = refreshRankings.bind(this);

  useEffect(() => {
    refreshRankings();
    return () => {
      setRankings({});
    };
  }, [loggedInUser, friends]);

  return (
    <Grid item>
      <Card style={{ height: "100%" }}>
        <CardHeader
          title="Rankings"
          titleTypographyProps={{ variant: "h5" }}
          style={{ padding: 10 }}
        />
        <CardContent>
          <Grid container direction="row" justify="center" spacing={3}>
            <Grid item>
              <KPI
                title="Among Friends"
                primaryMetric={ordinalSuffix(rankings.friendRank)}
                primaryDesc={`out of ${friends.length + 1}`}
                secondaryMetric={rankings.friendPercentile}
              />
            </Grid>
            <Grid item>
              <KPI
                title="Globally"
                primaryMetric={ordinalSuffix(rankings.globalRank)}
                primaryDesc={`${ordinalSuffix(
                  rankings.globalPercentile * 100
                )} percentile`}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default UserRankings;
