import React from "react";
import styled from "styled-components";

import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import robotImage from "../../statics/robot.jpg"; // https://dribbble.com/shots/5012092-Mr-Robot

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

const Progress = styled.div`
  margin: auto 0;
  min-width: 30%;
  text-align: right;
`;

const TaskProgress = ({ name, percentage }) => (
  <FlexWrapper>
    <img src={robotImage} height="100px" />
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
      <LinearProgress variant="determinate" value={percentage} />
      <Typography
        variant="overline"
        style={{ fontFamily: "Open Sans, sans-serif" }}
      >
        %{percentage}
      </Typography>
    </Progress>
    <img src={robotImage} height="100px" />
  </FlexWrapper>
);

export default TaskProgress;
