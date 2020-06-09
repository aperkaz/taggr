import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

import FancyButton from "../../molecules/FancyButton";
import backgroundImage from "../../statics/background.jpeg";

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0) url(${backgroundImage}) no-repeat scroll center
    center / cover;
  height: 100%;
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
  margin-bottom: 1rem;

  /* :hover {
    cursor: pointer;
  } */
`;

const A = styled.div`
  display: inline;

  text-decoration: none;
  color: white;

  :hover {
    cursor: pointer;
  }

  font-weight: bold;
`;

const SettingsPage = ({ onSelectReset, onSelectSave, onOpenLink }) => (
  <Wrapper>
    <InnerWrapper>
      <Main>
        <Typography
          variant="h3"
          style={{
            fontFamily: "Poppins, sans-serif",
            color: "white",
            marginBottom: "10vh",
          }}
        >
          Settings
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{
            fontFamily: "Open Sans",
            fontWeight: 600,
            color: "white",
            marginBottom: "10vh",
          }}
          onClick={onSelectReset}
        >
          Reset app
        </Button>
        <br />
        <FancyButton text="Save" onClick={onSelectSave} />
      </Main>

      <Footer
      // onClick={onSelectSupport}
      >
        <Typography
          variant="h6"
          style={{
            fontFamily: "Poppins, sans-serif",
            color: "white",
          }}
        >
          {/* Support us ❤️  */}
          <p>Open-beta release: v0.0.1</p>
          <div>
            Performance improvements and new features:{" "}
            <A onClick={() => onOpenLink("https://taggr.ai/#roadmap")}>
              check progress
            </A>
            {/* We are continuously working on preformance improvements and exciting
            new features (facial recognition, timeline representation of our
            pictures). */}
          </div>
          <p>
            Suggestions or improvements? Reach out to: <b>contact@taggr.ai</b>
          </p>
        </Typography>
      </Footer>
    </InnerWrapper>
  </Wrapper>
);

SettingsPage.propTypes = {
  onSelectReset: PropTypes.func,
  onSelectSave: PropTypes.func,
  // onSelectSupport: PropTypes.func,
  onOpenLink: PropTypes.func,
};

export default SettingsPage;
