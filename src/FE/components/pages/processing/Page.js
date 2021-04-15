import React from "react";
import styled from "styled-components";

import Typography from "../../atoms/Typography";
import Loading from "../../molecules/Loading";
import dots from "../../../statics/dots.svg";

const Wrapper = styled.div`
  background: url(${dots}) repeat center/auto;
  background-color: white;

  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ProcessWrapper = styled.div`
  margin: 3rem auto 0;

  min-width: 450px;
  width: 50%;
  max-width: 800px;
`;

const Center = styled.div`
  width: 100%;
  margin-top: 22vh;
`;

const Footer = styled.div`
  margin-bottom: 1rem;

  font-family: Open Sans;
  font-weight: 600;
  text-decoration: none;

  :hover {
    cursor: pointer;
  }
`;

const ProcessingPage = ({
  memoryNumber = "",
  handleSelectLogo = () => null,
}) => (
  <Wrapper>
    <Center>
      <Loading animationDuration={4} />

      <Typography variant="h3" style={{ textAlign: "center" }}>
        {`Locating ${memoryNumber} memories 🚀`}
      </Typography>

      <Typography
        variant="h6"
        style={{
          color: "#9F9999",
          textAlign: "center",
          marginTop: "1rem",
        }}
      >
        This may take some time, be patient !
      </Typography>
    </Center>

    <Footer onClick={handleSelectLogo}>
      <Typography variant="h5">taggr.ai</Typography>
    </Footer>
  </Wrapper>
);

/**
 * <Wrapper>
     <div>
      <Loading />
      <Typography variant="h3">{title}</Typography>
    </div> 
    <ProgressBar percentage={percentage} />
   </Wrapper>
 */

export default ProcessingPage;
