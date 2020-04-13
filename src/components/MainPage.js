import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  color: red;
`;

const MainPage = () => (
  <Wrapper>
    <header
      id="tag-search-input"
      className="columns is-multiline is-mobile is-vcentered is-centered"
    >
      input
    </header>
    <div id="image-gallery">image gallery</div>
  </Wrapper>
);

export default MainPage;
