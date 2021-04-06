import { Grid, Card, CardContent, CardHeader } from "@material-ui/core";
import React from "react";

function UserStats() {
  return (
    <Grid item xs>
      <Card style={{ height: "100%" }}>
        <CardHeader
          title="Stats"
          titleTypographyProps={{ variant: "body2" }}
          style={{ padding: 10 }}
        />
        <CardContent></CardContent>
      </Card>
    </Grid>
  );
}

export default UserStats;
