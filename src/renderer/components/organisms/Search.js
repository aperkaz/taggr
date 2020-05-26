import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import MaterialButton from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import robotImage from "../../statics/robot.jpg"; // https://dribbble.com/shots/5012092-Mr-Robot
import FancyButton from "../molecules/FancyButton";

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
  width: 100%;

  display: flex;
`;

const Filters = styled.div`
  width: 85%;

  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const Filter = styled.div`
  margin: 16px 8px;

  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  align-items: center;
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
  top: -12px;
  margin-bottom: -6px;
`;

const ButtonWrapper = styled.div`
  margin: 0 8px 8px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const SearchButton = ({ text }) => (
  <MaterialButton
    variant="outlined"
    style={{
      margin: "4px",
      minWidth: "130px",
      textTransform: "capitalize",
    }}
  >
    <Typography
      variant="subtitle2"
      style={{ fontFamily: "Open Sans" }}
      gutterBottom
    >
      {text}
    </Typography>
  </MaterialButton>
);

const Search = ({
  task: {
    isOngoing: isTaskOngoing,
    name: taskName,
    percentage: taskPercentage,
  },
}) => {
  // TODONOW: manage filter values
  // const [inputValue, setInputValue] = useState("");

  return isTaskOngoing ? (
    <TaskProgress name={taskName} percentage={taskPercentage} />
  ) : (
    <Wrapper>
      <Filters>
        <Filter>
          <Title>when</Title>
          <ButtonWrapper>
            <SearchButton text="🌙 Nights" />
            <SearchButton text="🌅 Mornings" />
          </ButtonWrapper>
        </Filter>
        <Filter>
          <Title>what</Title>
          <ButtonWrapper>
            <SearchButton text="🌚 Dark pics" />
            <SearchButton text="💡 Bright pics" />
            <SearchButton text="🚗 Vehicles" />
            <SearchButton text=" 🐱 Animals" />
            <SearchButton text="🍜 Food" />
            <SearchButton text="⚽️ Sports" />
          </ButtonWrapper>
        </Filter>
        <Filter>
          <Title>where</Title>
          <ButtonWrapper>
            <SearchButton text="⛰ Mountains" />
            <SearchButton text="🌊 Water" />
          </ButtonWrapper>
        </Filter>
        <Filter>
          <Title>people</Title>
          <ButtonWrapper>
            <SearchButton text="🤗 Happy" />
            <SearchButton text="☹️ Sad" />
            <SearchButton text="💨 Alone" />
            <SearchButton text="👯‍♂️ Group" />
          </ButtonWrapper>
        </Filter>
      </Filters>
      <div style={{ margin: "auto" }}>
        <FancyButton text="surprise me" />
      </div>
    </Wrapper>
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
