import { Grid, Card, CardContent, CardHeader } from "@material-ui/core";
import React from "react";

function UserQuizHistoryTaken() {
  return (
    <Grid item xs>
      <Card style={{ height: "100%" }}>
        <CardHeader
          title="Quizzes Taken"
          titleTypographyProps={{ variant: "body2" }}
          style={{ padding: 10 }}
        />
        <CardContent></CardContent>
      </Card>
    </Grid>
  );
}

export default UserQuizHistoryTaken;
