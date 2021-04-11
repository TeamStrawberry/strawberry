import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
} from "@material-ui/core";

function KPI({ title, primaryDesc, primaryMetric, primaryColor }) {
  return (
    <Card
      style={{
        minWidth: "200px",
        backgroundColor: "#d2fdff",
      }}
    >
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: "body2" }}
        style={{ paddingBottom: 0 }}
      ></CardHeader>
      <CardContent>
        <Typography variant="h2">
          <Box fontWeight="bold">{primaryMetric}</Box>
        </Typography>
        <Typography variant="body2">
          <Box fontStyle="italic">{primaryDesc}</Box>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default KPI;
