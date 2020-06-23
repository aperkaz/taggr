import React from "react";
import styled from "styled-components";
import Typography from "../atoms/Typography";
import face1 from "../../statics/face1.jpg";
import face2 from "../../statics/face2.jpg";
import face3 from "../../statics/face3.jpg";
import face4 from "../../statics/face4.jpg";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 1em;
  /* compensates for unevent css rules */
  margin-bottom: 1.5em;

  border-radius: 6px;

  display: flex;
`;

const Container = styled.div`
  margin: auto;
`;

const Pictures = styled.div`
  display: flex;
`;

const Img = styled.img`
  margin: 1em;
  filter: blur(4px);
  border-radius: 6px;
`;

const Faces = () => (
  <Wrapper>
    <Container>
      <Pictures>
        <Img src={face1} height="200px" />
        <Img src={face2} height="200px" />
        <Img src={face3} height="200px" />
        <Img src={face4} height="200px" />
      </Pictures>

      <Typography
        variant={"h6"}
        style={{ margin: "2em 0", textAlign: "center" }}
      >
        {"Offline facial recognition under development, stay tuned!"}
      </Typography>
    </Container>
  </Wrapper>
);

export default Faces;
