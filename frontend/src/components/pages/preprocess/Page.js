import React from "react";
import styled from "styled-components";

import Loading from "../../molecules/Loading";
import Typography from "../../atoms/Typography";
import dots from "../../../statics/dots.svg";

const Wrapper = styled.div`
  background: url(${dots}) repeat center/auto;

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
  margin-top: auto;
  margin-bottom: 1rem;
  font-weight: 600;
  text-decoration: none;

  :hover {
    cursor: pointer;
  }
`;

const PrepocessPage = ({ memoryNumber = "", onSelectLogo = () => null }) => (
  <Wrapper>
    <Main>
      <Loading animationDuration={4} />
      <Typography
        variant="h3"
        style={{ marginTop: "-1.5rem" }}
      >{`Locating ${memoryNumber} memories 🚀`}</Typography>
      <Typography
        variant="body1"
        style={{ marginTop: "2rem", color: "#9F9999" }}
      >
        This may take some time, be patient !
      </Typography>
    </Main>

    <Footer onClick={onSelectLogo}>
      <Typography variant="h5">taggr.ai</Typography>
    </Footer>
  </Wrapper>
);

export default PrepocessPage;
