import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

import backgroundImage from "../../../statics/background.jpeg";

// TODONOW: refactor component structure to modules (each page one module. Shared comps in shared). Each page, one module. One connection to the store via wrapper.

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

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0) url(${backgroundImage}) no-repeat scroll center
    center / cover;
  height: 100%;
`;

const Main = styled.div`
  margin: auto;
`;

const UnderTitle = styled.p`
  margin-bottom: 2rem;
  font-family: Open Sans;
  color: white;
  font-size: 1.75rem;
`;

const Footer = styled.a`
  font-family: Open Sans;
  margin-bottom: 0.5rem;
  color: white;
  font-weight: 600;
  text-decoration: none;
`;

const StartPage = ({ onSelectRootFolderPath }) => (
  <Wrapper>
    <InnerWrapper>
      <Main>
        <Typography
          variant="h1"
          component="h1"
          style={{ fontFamily: "Poppins, sans-serif", color: "white" }}
          gutterBottom
        >
          taggr
        </Typography>
        <Typography
          variant="h6"
          style={{ fontFamily: "Poppins, sans-serif", color: "white" }}
        >
          Rediscover your <b>memories</b> while keeping your <b>privacy</b>
        </Typography>
        <UnderTitle></UnderTitle>
        <Button
          variant="outlined"
          size="large"
          style={{
            fontFamily: "Open Sans",
            fontWeight: 600,
            color: "white",
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          }}
          onClick={onSelectRootFolderPath}
        >
          Select picture folder
        </Button>
      </Main>

      <Footer href="https://taggr.ai">
        <Typography
          variant="h6"
          style={{
            fontFamily: "Poppins, sans-serif",
            color: "white",
            fontWeight: "bold",
          }}
        >
          taggr.ai
        </Typography>
      </Footer>
    </InnerWrapper>
  </Wrapper>
);

StartPage.propTypes = {
  onSelectRootFolderPath: PropTypes.func,
};

export default StartPage;
