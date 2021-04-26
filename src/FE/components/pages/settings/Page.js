import React from "react";
import styled from "styled-components";

import Typography from "../../atoms/Typography";

import FancyButton from "../../molecules/ButtonFancy";
import ButtonRegular from "../../molecules/ButtonRegular";

import backgroundImage from "../../../statics/background.jpeg";

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
  min-width: 600px;

  display: flex;
  flex-direction: column;

  > div {
    margin-top: 2rem;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Footer = styled.div`
  margin-bottom: 1rem;

  :hover {
    cursor: pointer;
  }
`;

const SettingsPage = ({
  onBrowseMore,
  onSelectDestroy,
  onSelectBack,
  onOpenLink,
}) => (
  <Wrapper>
    <InnerWrapper>
      <Main>
        <Typography
          variant="h3"
          style={{
            color: "white",
            marginBottom: "10vh",
          }}
        >
          Settings
        </Typography>

        <Row>
          <Typography
            variant="h5"
            style={{
              color: "white",
              textAlign: "left",
              flex: 1,
            }}
          >
            Browse more memories
          </Typography>

          <ButtonRegular
            text={"✅ Yes, please!"}
            onClick={onBrowseMore}
            style={{
              background: "#1976d2",
            }}
          />
        </Row>

        <Row>
          <Typography
            variant="h5"
            style={{
              color: "white",
              textAlign: "left",
              flex: 1,
            }}
          >
            Wipe all data
          </Typography>
          <ButtonRegular
            text={"💣 Reset"}
            onClick={onSelectDestroy}
            style={{
              background: "red",
            }}
          />
        </Row>

        <FancyButton
          text="Save"
          onClick={onSelectBack}
          style={{ margin: "3rem auto" }}
        />
      </Main>

      <Footer onClick={onOpenLink}>
        <Typography
          variant="h5"
          style={{
            color: "white",
          }}
        >
          Support us ❤️
          {/* taggr.ai */}
        </Typography>
      </Footer>
    </InnerWrapper>
  </Wrapper>
);

export default SettingsPage;
