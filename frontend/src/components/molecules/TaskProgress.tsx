import React from "react";
import styled from "styled-components";
import { withStyles } from "@mui/styles";
import LinearProgress from "@mui/material/LinearProgress";

import Typography from "../atoms/Typography";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Progress = styled.div`
  margin: 0 0 1em;
  min-width: 30%;
  text-align: right;
`;

const BorderLinearProgress = withStyles(() => ({
  root: {
    borderRadius: 4,
    height: 6,
  },
  bar: {
    borderRadius: 5,
    background: "linear-gradient(70.98deg, #fe4e74 9.38%, #ff8a4d 91.67%)",
  },
}))(LinearProgress);

const TaskProgress = ({
  name,
  percentage,
}: {
  name: string;
  percentage: number;
}) => (
  <FlexWrapper>
    <Progress>
      <Typography
        variant="subtitle1"
        style={{
          fontFamily: "Poppins, sans-serif",
          textAlign: "center",
          margin: ".75rem 0",
        }}
      >
        {name}
      </Typography>
      <BorderLinearProgress variant="determinate" value={percentage} />
    </Progress>
  </FlexWrapper>
);

export default TaskProgress;