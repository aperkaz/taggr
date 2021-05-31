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

  border-radius: 6px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Pictures = styled.div`
  display: grid;
  grid-template-columns: max-content max-content;
`;

const Img = styled.img`
  margin: 1em;
  filter: blur(4px);
  border-radius: 6px;
`;

const Faces = () => (
  <Wrapper>
    <Pictures>
      <Img src={face1} height="150px" />
      <Img src={face2} height="150px" />
      <Img src={face3} height="150px" />
      <Img src={face4} height="150px" />
    </Pictures>

    <Typography variant="h6" style={{ margin: "2em 0", textAlign: "center" }}>
      {"🚧 Offline facial recognition comming soon, stay tuned!"}
    </Typography>
  </Wrapper>
);

export default Faces;
