import React from "react";
import styled from "styled-components";

const MainPage = () => (
  <Wrapper>
    <header>
      <input placeholder="type tags"></input>
    </header>
    <div id="image-gallery">image gallery</div>
  </Wrapper>
);

const Wrapper = styled.div`
  height: 100%;
  background-color: gray;
`;

export default MainPage;
