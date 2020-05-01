import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Logo from "../molecules/Logo";

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
  justify-content: space-evenly;
  margin: auto;
  text-align: center;
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

const SecondaryUnderTitle = styled.p`
  margin-bottom: 3rem;
  font-family: Open Sans;
  color: white;
  font-size: 1.75 rem;
`;

const Footer = styled.a`
  font-family: Open Sans;
  margin-bottom: 0.5rem;
  color: white;
  font-weight: 600;
`;

const StartPage = ({ onSelectRootFolderPath }) => (
  <Wrapper>
    <Header>
      <Logo />
      <div>menu</div>
    </Header>
    <Main>
      <Title>Taggr</Title>
      <UnderTitle>
        Rediscover your memories while keeping your privacy
      </UnderTitle>
      <SecondaryUnderTitle>Powered by Machine-Learning</SecondaryUnderTitle>
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
  </Wrapper>
);

export default StartPage;
