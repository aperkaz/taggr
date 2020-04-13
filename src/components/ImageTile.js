import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;

  border-radius: 4px;

  background-image: url(${(props) => props.imageUrl});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;

// TODO: detect when the image is loaded: https://stackoverflow.com/questions/5057990/how-can-i-check-if-a-background-image-is-loaded
const ImageTile = ({ imageUrl }) => <Wrapper imageUrl={imageUrl}></Wrapper>;

export default ImageTile;
