import React from "react";
import styled from "styled-components";

import Typography from "../../atoms/Typography";
import Loading from "../../molecules/Loading";
import ProgressBar from "../../molecules/ProgressBar";

const Wrapper = styled.div`
  height: 100%;

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
  margin-top: 12vh;
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

const ProcessingPage = ({ title, subtitle, percentage }) => (
  <Wrapper>
    <Center>
      <Loading />

      <Typography variant="h3" style={{ textAlign: "center" }}>
        {title}
      </Typography>
      {subtitle ? (
        <Typography
          variant="h6"
          style={{
            color: "#9F9999",
            textAlign: "center",
            marginTop: "1rem",
          }}
        >
          {subtitle}
        </Typography>
      ) : null}

      <ProcessWrapper>
        {percentage ? <ProgressBar percentage={percentage} /> : null}
      </ProcessWrapper>
    </Center>

    <Footer>
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
