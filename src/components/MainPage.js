import React from "react";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import ImageTile from "./ImageTile";

const Wrapper = styled.div`
  height: 100%;
  background-color: gray;
`;

const MainPage = view(() => {
  return (
    <Wrapper>
      <header>
        <input placeholder="type tags"></input>
      </header>
      <div id="image-gallery" style={{ height: "200px", width: "200px" }}>
        <ImageTile></ImageTile>
      </div>
    </Wrapper>
  );
});

export default MainPage;
