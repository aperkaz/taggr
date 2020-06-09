import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
    width: 100%;
    border-radius: 4px;
    background-image: url('${(props) => props.imageUrl}');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
`;

const ImageTile = ({ imageUrl = "" }) => <Wrapper imageUrl={imageUrl} />;

export default ImageTile;
