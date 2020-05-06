import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Logo from "../molecules/Logo";
import backgroundImage from "./background.jpeg";

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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const Main = styled.div`
  margin: auto;
`;

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 3rem;
  font-family: Poppins;
  text-shadow: 0 0 0.5px #6f6e6e, 0 0 2px #10101d;
  font-size: 5rem;
  color: white;
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
`;

const StartPage = ({ onSelectRootFolderPath, onLogoClick }) => (
  <Wrapper>
    <InnerWrapper>
      <Header>
        <Logo onClick={onLogoClick} />
        {/* <div>menu</div> */}
      </Header>
      <Main>
        <Title>Taggr</Title>
        <UnderTitle>
          Rediscover your memories while keeping your privacy
          <br />
          Powered by Machine-Learning
        </UnderTitle>
        <Button
          variant="outlined"
          size="large"
          style={{
            fontFamily: "Open Sans",
            fontWeight: 600,
            color: "white",
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          }}
          onClick={async () => await onSelectRootFolderPath()}
        >
          Select picture folder
        </Button>
      </Main>
      <Footer href="https://taggr.ai">taggr.ai</Footer>
    </InnerWrapper>
  </Wrapper>
);

export default StartPage;
