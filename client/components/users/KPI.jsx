import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";

function KPI({ title, primaryDesc, primaryMetric, primaryColor }) {
  return (
    <Card style={{ minWidth: "200px" }}>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: "body2" }}
        style={{ padding: 10 }}
      ></CardHeader>
      <CardContent>
        <Typography variant="h2">{primaryMetric}</Typography>
        <Typography variant="body2">{primaryDesc}</Typography>
      </CardContent>
    </Card>
  );
}

export default KPI;
