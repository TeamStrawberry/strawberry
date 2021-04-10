import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, CardHeader } from "@material-ui/core";
import { getOverallStats } from "../../../api_master";

function UserStats({ loggedInUser }) {
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
  }, []);

  return (
    <Grid item xs>
      <Card style={{ height: "100%" }}>
        <CardHeader
          title="Stats"
          titleTypographyProps={{ variant: "body2" }}
          style={{ padding: 10 }}
        />
        <CardContent>
          <p>{`Completed Quizzes ${stats.completedQuizzes}`}</p>
          <p>{`Correct Answers ${stats.correctAnswers}`}</p>
          <p>{`Avg Score ${stats.userAvgScore}`}</p>
          <p>{`Avg Completed Quizzes ${stats.globalAvgQuizzesComp}`}</p>
          <p>{`Avg Correct Answers ${stats.globalAvgCorrectAnswers}`}</p>
          <p>{`Avg Avg Score ${stats.globalAvgScore}`}</p>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default UserStats;
