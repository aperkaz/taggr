import React from "react";
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const spin = keyframes`
    0%,
    100% {
      transform: translate(0);
    }
    25% {
      transform: translate(160%);
    }
    50% {
      transform: translate(160%, 160%);
    }
    75% {
      transform: translate(0, 160%);
    }
`;

const AnimationWrapper = styled.div`
  position: relative;

  top: 50px;
  left: 50px;

  transform: translate(-50%, -50%);

  /*change these sizes to fit into your project*/
  width: 100px;
  height: 100px;
`;

const Hr = styled.hr`
  border: 0;
  margin: 0;
  width: 40%;
  height: 40%;
  position: absolute;
  border-radius: 50%;
  animation: ${spin} 2s ease infinite;
`;

const Element1 = styled(Hr)`
  background: #8731e8;
  animation-delay: -1.5s;
`;

const Element2 = styled(Hr)`
  background: #4528dc;
  animation-delay: -1s;
`;

const Element3 = styled(Hr)`
  background: #ff8e53;
  animation-delay: -0.5s;
`;

const Element4 = styled(Hr)`
  background: #fe6b8b;
`;

const Loading = () => (
  <Wrapper>
    <AnimationWrapper>
      <Element1 />
      <Element2 />
      <Element3 />
      <Element4 />
    </AnimationWrapper>
  </Wrapper>
);

export default Loading;
