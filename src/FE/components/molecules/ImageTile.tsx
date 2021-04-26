// @ts-nocheck
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 6px;
  background-image: url("${(props) => props.imageUrl}");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.24);
`;

const ImageTile = ({ imageUrl = "" }) => <Wrapper imageUrl={imageUrl} />;

export default ImageTile;
