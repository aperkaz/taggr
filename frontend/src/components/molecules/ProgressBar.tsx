import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Progress = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 0 1em;

  text-align: right;
`;

const BorderLinearProgress = withStyles(() => ({
  root: {
    borderRadius: 4,
    height: 10,
  },
  bar: {
    borderRadius: 5,
    background: "linear-gradient(70.98deg, #fe4e74 9.38%, #ff8a4d 91.67%)",
  },
}))(LinearProgress);

type Props = { percentage: number };

const ProgressBar = ({ percentage = 0 }: Props) => (
  <FlexWrapper>
    <Progress>
      <BorderLinearProgress variant="determinate" value={percentage} />
    </Progress>
  </FlexWrapper>
);

export default ProgressBar;
