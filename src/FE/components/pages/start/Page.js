import React from "react";
import styled from "styled-components";

import FancyButton from "../../molecules/ButtonFancy";
import backgroundImage from "../../../statics/background.jpeg";
import Typography from "../../atoms/Typography";

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0) url(${backgroundImage}) no-repeat scroll center
    center / cover;
  height: 100vh;
`;

const InnerWrapper = styled.div`
  background: linear-gradient(
    -47deg,
    rgb(135, 49, 232, 0.9) 0%,
    rgb(69, 40, 220, 0.9) 100%
  );

  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: auto;
  text-align: center;
`;

const Main = styled.div`
  margin: auto;
`;

const Footer = styled.div`
  font-family: Open Sans;
  margin-bottom: 1rem;
  color: white;
  font-weight: 600;
  text-decoration: none;

  :hover {
    cursor: pointer;
  }
`;

const StartPage = ({
  onSelectRootFolderPath = () => null,
  onSelectLogo = () => null,
}) => (
  <Wrapper>
    <InnerWrapper>
      <Main>
        <Typography
          variant="h1"
          component="h1"
          style={{
            fontFamily: "Poppins, sans-serif",
            color: "white",
            marginBottom: ".5em",
          }}
          gutterBottom
        >
          taggr
        </Typography>
        <Typography
          variant="h5"
          style={{
            color: "white",
            marginBottom: "2em",
          }}
        >
          Rediscover your memories while keeping your privacy
        </Typography>
        <FancyButton
          text="Select picture folder"
          onClick={onSelectRootFolderPath}
        />
      </Main>

      <Footer onClick={onSelectLogo}>
        <Typography variant="h5" style={{ color: "white" }}>
          taggr.ai
        </Typography>
      </Footer>
    </InnerWrapper>
  </Wrapper>
);

export default StartPage;