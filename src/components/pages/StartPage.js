import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const Wrapper = styled.div`
  background-image: linear-gradient(
    to top right,
    rgb(101, 115, 255),
    rgb(111, 114, 247),
    rgb(120, 114, 239),
    rgb(130, 113, 231),
    rgb(139, 112, 223),
    rgb(149, 111, 215),
    rgb(158, 111, 208),
    rgb(168, 110, 200),
    rgb(177, 109, 192),
    rgb(187, 108, 184),
    rgb(196, 108, 176),
    rgb(206, 107, 168)
  );
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: auto;
  text-align: center;
`;

// TODO: style: use styled components

const StartPage = ({ onSelectRootFolderPath }) => (
  <Wrapper>
    <div>
      <h1
        style={{
          marginTop: "0",
          marginBottom: "3rem",
          fontFamily: "Pacifico",
          textShadow: "0 0 1px #6f6e6e, 0 0 3px #10101d",
          fontSize: "5rem",
          color: "white",
        }}
      >
        taggr
      </h1>
      <p
        style={{
          marginBottom: "2rem",
          fontFamily: "Nunito",
          color: "white",
          fontSize: "1.25rem",
        }}
      >
        Rediscover your memories while keeping your privacy
        <br />
        <br />
        Powered by Machine-Learning
        <br />
      </p>
      <Button
        variant="outlined"
        style={{
          fontFamily: "Nunito",
          color: "white",
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        }}
        onClick={async () => await onSelectRootFolderPath()}
      >
        Select picture folder
      </Button>
    </div>
  </Wrapper>
);

export default StartPage;
