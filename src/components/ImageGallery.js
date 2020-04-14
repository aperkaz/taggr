import React from "react";
import styled from "styled-components";
import ImageTile from "./ImageTile";

const Wrapper = styled.div`
  margin: 5px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  /* TODO: define 4k and so on behaviour */
  @media (min-width: 3820px) {
    width: 60%;
    margin: 5px auto;
  }
`;

const ImageWrapper = styled.div`
  padding: 5px;

  min-height: 200px;
  height: calc(25% -10px);

  min-width: 200px;
  width: calc(25% - 10px);
`;

// TODO: virtualize list for performance https://github.com/developerdizzle/react-virtual-list
const ImageGallery = ({ imageList = [] }) => (
  <Wrapper>
    {imageList.map((image) => (
      <ImageWrapper key={image.hash}>
        <ImageTile imageUrl={image.path}></ImageTile>
      </ImageWrapper>
    ))}
  </Wrapper>
);

export default ImageGallery;
