import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";

function InfoBox({ title, cn, cases }) {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography id="id_title" className={cn}>
            {title}
          </Typography>
          <Typography id="id_cases" className={cn}>
            {cases}
            {/* {casesbyMap} */}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;
