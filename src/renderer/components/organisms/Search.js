import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import TagCountDisplay from "../molecules/TagCountDisplay";
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

const Wrapper = styled.div`
  padding-top: 20px;

  display: flex;
  justify-content: space-around;
`;

const Section = styled.div`
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 4px;

  display: flex;
  /* flex-direction: column; */
  justify-content: start;
  align-items: flex-start;

  width: 100%;

  padding: 8px;
`;

const Title = styled.div`
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 2px 4px;

  color: #717171;
  background-color: white;

  font-weight: 500;
  font-family: Roboto;

  position: relative;
  margin: 0 auto;
  top: -20px;
  margin-bottom: -18px;
`;

const Search = ({
  task: {
    isOngoing: isTaskOngoing,
    name: taskName,
    percentage: taskPercentage,
  },
  onInputChange,
  tagCountList,
}) => {
  const [inputValue, setInputValue] = useState("");

  return isTaskOngoing ? (
    <TaskProgress name={taskName} percentage={taskPercentage} />
  ) : (
    <Wrapper>
      <Section>
        <Title>when</Title>
        <Button
          variant="outlined"
          style={{
            margin: "8px",
            textTransform: "capitalize",
          }}
        >
          <Typography
            variant="subtitle1"
            style={{ fontFamily: "Open Sans" }}
            gutterBottom
          >
            🌙 Late nights
          </Typography>
        </Button>
        <Button
          variant="outlined"
          style={{ margin: "8px", textTransform: "capitalize" }}
        >
          <Typography
            variant="subtitle1"
            style={{ fontFamily: "Open Sans" }}
            gutterBottom
          >
            🌅 Early mornings
          </Typography>
        </Button>
        <div></div>
      </Section>
      <Section>
        <Title>what</Title>
        <Button
          variant="outlined"
          style={{ margin: "8px", textTransform: "capitalize" }}
        >
          <Typography
            variant="subtitle1"
            style={{ fontFamily: "Open Sans" }}
            gutterBottom
          >
            🌚 Dark pics
          </Typography>
        </Button>
        <Button
          variant="outlined"
          style={{ margin: "8px", textTransform: "capitalize" }}
        >
          <Typography
            variant="subtitle1"
            style={{ fontFamily: "Open Sans" }}
            gutterBottom
          >
            💡 Bright pics
          </Typography>
        </Button>
        <Button
          variant="outlined"
          style={{ margin: "8px", textTransform: "capitalize" }}
        >
          <Typography
            variant="subtitle1"
            style={{ fontFamily: "Open Sans" }}
            gutterBottom
          >
            🚗 Vehicles
          </Typography>
        </Button>
        <Button
          variant="outlined"
          style={{ margin: "8px", textTransform: "capitalize" }}
        >
          <Typography
            variant="subtitle1"
            style={{ fontFamily: "Open Sans" }}
            gutterBottom
          >
            🐱 Animals
          </Typography>
        </Button>
        <Button
          variant="outlined"
          style={{ margin: "8px", textTransform: "capitalize" }}
        >
          <Typography
            variant="subtitle1"
            style={{ fontFamily: "Open Sans" }}
            gutterBottom
          >
            🍜 Food / Drinks
          </Typography>
        </Button>
        <Button
          variant="outlined"
          style={{ margin: "8px", textTransform: "capitalize" }}
        >
          <Typography
            variant="subtitle1"
            style={{ fontFamily: "Open Sans" }}
            gutterBottom
          >
            ⚽️ Sports
          </Typography>
        </Button>
      </Section>
      <Section>
        <Title>where</Title>
        <Button
          variant="outlined"
          style={{ margin: "8px", textTransform: "capitalize" }}
        >
          <Typography
            variant="subtitle1"
            style={{ fontFamily: "Open Sans" }}
            gutterBottom
          >
            ⛰ Mountains
          </Typography>
        </Button>
        <Button
          variant="outlined"
          style={{ margin: "8px", textTransform: "capitalize" }}
        >
          <Typography
            variant="subtitle1"
            style={{ fontFamily: "Open Sans" }}
            gutterBottom
          >
            🌊 Water
          </Typography>
        </Button>
      </Section>
      <Section>
        <Title>people</Title>
        <Button
          variant="outlined"
          style={{ margin: "8px", textTransform: "capitalize" }}
        >
          <Typography
            variant="subtitle1"
            style={{ fontFamily: "Open Sans" }}
            gutterBottom
          >
            🤗 Happy
          </Typography>
        </Button>
        <Button
          variant="outlined"
          style={{ margin: "8px", textTransform: "capitalize" }}
        >
          <Typography
            variant="subtitle1"
            style={{ fontFamily: "Open Sans" }}
            gutterBottom
          >
            ☹️ Sad
          </Typography>
        </Button>
        <Button
          variant="outlined"
          style={{ margin: "8px", textTransform: "capitalize" }}
        >
          <Typography
            variant="subtitle1"
            style={{ fontFamily: "Open Sans" }}
            gutterBottom
          >
            💨 Alone
          </Typography>
        </Button>{" "}
        <Button
          variant="outlined"
          style={{ margin: "8px", textTransform: "capitalize" }}
        >
          <Typography
            variant="subtitle1"
            style={{ fontFamily: "Open Sans" }}
            gutterBottom
          >
            👯‍♂️ Group
          </Typography>
        </Button>
      </Section>
    </Wrapper>
    // <div style={{ padding: "20px 0" }}>
    //   <FlexWrapper>
    //     <TextField
    //       id="outlined-basic"
    //       label="Tags"
    //       variant="outlined"
    //       placeholder="Search by tag"
    //       value={inputValue}
    //       onChange={(e) => {
    //         setInputValue(e.target.value);
    //         onInputChange(e.target.value);
    //       }}
    //     />
    //   </FlexWrapper>
    //   <div style={{ marginTop: "8px" }}>
    //     <TagCountDisplay
    //       tagCountList={tagCountList}
    //       onTagClick={(t) => {
    //         setInputValue(t);
    //         onInputChange(t);
    //       }}
    //     />
    //   </div>
    // </div>
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
};

export default Search;
