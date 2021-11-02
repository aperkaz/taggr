import React from "react";
import styled, { keyframes } from "styled-components";
import Typography from "../atoms/Typography";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const Hr = styled.hr<{ animationDuration: number }>`
  border: 0;
  margin: 0;
  width: 40%;
  height: 40%;
  position: absolute;
  border-radius: 50%;
  animation: ${spin} ${(props) => props.animationDuration}s ease infinite;
`;

const Element1 = styled(Hr)<{ animationDelay: number }>`
  background: #8731e8;
  animation-delay: ${(props) => props.animationDelay}s;
`;

const Element2 = styled(Hr)<{ animationDelay: number }>`
  background: #4528dc;
  animation-delay: ${(props) => props.animationDelay}s;
`;

const Element3 = styled(Hr)<{ animationDelay: number }>`
  background: #ff8e53;
  animation-delay: ${(props) => props.animationDelay}s;
`;

const Element4 = styled(Hr)<{ animationDelay: number }>`
  background: #fe6b8b;
  animation-delay: ${(props) => props.animationDelay}s;
`;

type Props = {
  animationDuration?: number;
  text: string;
};

const Loading = ({ animationDuration = 6, text = "" }: Props) => {
  const elements = 4;
  const animationUnit = animationDuration / elements;

  return (
    <Wrapper>
      <AnimationWrapper>
        <Element1 animationDuration={animationDuration} animationDelay={0} />
        <Element2
          animationDuration={animationDuration}
          animationDelay={animationUnit * 1}
        />
        <Element3
          animationDuration={animationDuration}
          animationDelay={animationUnit * 2}
        />
        <Element4
          animationDuration={animationDuration}
          animationDelay={animationUnit * 3}
        />
      </AnimationWrapper>
      <Typography variant={"h6"} style={{ marginTop: "2em" }}>
        {text}
      </Typography>
    </Wrapper>
  );
};

export default Loading;
