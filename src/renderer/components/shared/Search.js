import React, { useState, useMemo } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import TagCountDisplay from "./TagCountDisplay";
import robotVideo from "../../statics/robot.mp4"; // https://dribbble.com/shots/5012092-Mr-Robot

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

const Search = ({
  task: {
    isOngoing: isTaskOngoing,
    name: taskName,
    percentage: taskPercentage,
  },
  onInputChange,
  onPressReset,
  tagCountList,
}) => {
  const [inputValue, setInputValue] = useState("");

  return isTaskOngoing ? (
    <FlexWrapper>
      <video src={robotVideo} height="100px"></video>
      <Progress>
        <Typography
          variant="subtitle1"
          style={{
            fontFamily: "Poppins, sans-serif",
            textAlign: "center",
            margin: ".75rem 0",
          }}
        >
          {taskName}
        </Typography>
        <LinearProgress variant="determinate" value={taskPercentage} />
        <Typography
          variant="overline"
          style={{ fontFamily: "Open Sans, sans-serif" }}
        >
          %{taskPercentage}
        </Typography>
      </Progress>
      <video src={robotVideo} height="100px"></video>
    </FlexWrapper>
  ) : (
    <div style={{ padding: "20px 0" }}>
      <FlexWrapper>
        <TextField
          id="outlined-basic"
          label="Tags"
          variant="outlined"
          placeholder="Search by tag"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            onInputChange(e.target.value);
          }}
        />
        <Button
          style={{
            fontFamily: "Open Sans",
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            fontWeight: 600,
            color: "white",
          }}
          onClick={onPressReset}
        >
          Reset taggr
        </Button>
      </FlexWrapper>
      <div style={{ marginTop: "8px" }}>
        <TagCountDisplay
          tagCountList={tagCountList}
          onTagClick={(t) => {
            setInputValue(t);
            onInputChange(t);
          }}
        />
      </div>
    </div>
  );
};

Search.defaultProps = {
  task: {
    isOngoing: false,
    name: "",
    percentage: 0,
  },
};

Search.PropTypes = {
  task: PropTypes.shape({
    isOngoing: PropTypes.bool,
    name: PropTypes.string,
    percentage: PropTypes.number,
  }),
  tagCountList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      count: PropTypes.number,
    })
  ).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onPressReset: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({ task: state.task });

// TODONOW: does not need to be connected here
// export default connect(mapStateToProps)(Search);

export default Search;
