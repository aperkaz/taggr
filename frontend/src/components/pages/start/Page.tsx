import React from "react";
import styled from "styled-components";

import Typography from "../../atoms/Typography";
import FancyButton from "../../molecules/ButtonFancy";
import backgroundImage from "../../../statics/background.jpg";

const Background = styled.div`
  background: rgba(0, 0, 0, 0) url(${backgroundImage}) no-repeat scroll center
    center / cover;
  height: 100vh;
`;

const ColorOverlay = styled.div`
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

const Title = styled.div`
  margin-bottom: 4rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Subtitle = styled.div`
  margin-bottom: 5rem;
`;

const Footer = styled.div`
  margin-bottom: 1rem;

  :hover {
    cursor: pointer;
  }
`;

type Props = {
  onSelectRootFolderPath: (path: string) => void;
  onSelectLogo: () => void;
};

const StartPage = ({ onSelectRootFolderPath, onSelectLogo }: Props) => (
  <Background>
    <ColorOverlay>
      <Main>
        <Title>
          <svg
            width="100"
            height="65"
            viewBox="0 0 20 18"
            style={{
              marginTop: "14px",
              marginRight: "1rem",
            }}
          >
            <g opacity="1" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.3425 16.0862C18.8242 16.0862 22.4574 12.4851 22.4574 8.04308C22.4574 3.60101 18.8242 0 14.3425 0C12.6388 0 11.0577 0.520382 9.75227 1.40953C8.9514 1.10321 8.08112 0.93526 7.17126 0.93526C3.21068 0.93526 0 4.11755 0 8.04309C0 11.9686 3.21068 15.1509 7.17126 15.1509C8.08113 15.1509 8.95142 14.983 9.7523 14.6766C11.0578 15.5658 12.6388 16.0862 14.3425 16.0862ZM11.8514 13.4287C12.6097 13.7738 13.4534 13.9663 14.3425 13.9663C17.643 13.9663 20.3186 11.3144 20.3186 8.04308C20.3186 4.77179 17.643 2.11988 14.3425 2.11988C13.4534 2.11988 12.6097 2.31232 11.8514 2.65746C13.3768 3.96091 14.3425 5.89023 14.3425 8.04309C14.3425 10.196 13.3768 12.1253 11.8514 13.4287Z"
              fill="white"
            />
          </svg>

          <Typography
            variant="h1"
            style={{
              color: "white",
            }}
          >
            taggr
          </Typography>
        </Title>

        <Subtitle>
          <Typography
            variant="h5"
            style={{
              color: "white",
            }}
          >
            Rediscover your memories while keeping your privacy
          </Typography>
        </Subtitle>

        <FancyButton
          text="🔍 Load pictures"
          // @ts-ignore
          onClick={onSelectRootFolderPath}
          style={{
            backgroundColor: "4px 4px 8px #1f1f1f",
          }}
        />
      </Main>

      <Footer onClick={onSelectLogo}>
        <Typography variant="h5" style={{ color: "white" }}>
          taggr.ai
        </Typography>
      </Footer>
    </ColorOverlay>
  </Background>
);

export default StartPage;
