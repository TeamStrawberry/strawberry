import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, CardHeader } from "@material-ui/core";
import { getOverallStats } from "../../../api_master";
import KPI from "./KPI";

function UserStats({ loggedInUser, friends }) {
  const [stats, setStats] = useState({});

  var refreshStats = () => {
    if (loggedInUser.id) {
      getOverallStats(loggedInUser.id).then((stats) => {
        setStats(stats.data);
      });
    }
  };
  refreshStats = refreshStats.bind(this);

  useEffect(() => {
    refreshStats();
    return () => {
      setStats({});
    };
  }, [loggedInUser, friends]);

  return (
    <Grid item xs>
      <Card style={{ height: "100%" }}>
        <CardHeader
          title="Stats"
          titleTypographyProps={{ variant: "h5" }}
          style={{ padding: 10 }}
        />
        <CardContent>
          <Grid container direction="row" justify="center" spacing={3}>
            <Grid item>
              <KPI
                title="Quizzes Taken"
                primaryMetric={stats.completedQuizzes || 0}
                primaryDesc={`Global Average ${parseFloat(
                  stats.globalAvgQuizzesComp
                ).toFixed(2)}`}
              />
            </Grid>
            <Grid item>
              <KPI
                title="Correct Answers"
                primaryMetric={stats.correctAnswers || 0}
                primaryDesc={`Global Average ${parseFloat(
                  stats.globalAvgCorrectAnswers
                ).toFixed(2)}`}
              />
            </Grid>
            <Grid item>
              <KPI
                title="Average Score"
                primaryMetric={Math.round(stats.userAvgScore * 100) + "%"}
                primaryDesc={`Global Average ${Math.round(
                  stats.globalAvgScore * 100
                )}%`}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default UserStats;
