import React, { useState } from "react";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  @keyframes placeHolderShimmer {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 5000px 0;
    }
  }

  height: 100%;
  width: 100%;
  border-radius: 4px;

  animation-duration: 35s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 10%, #dddddd 25%, #eeeeee 50%);
  position: relative;
`;

const Loading = () => <LoadingWrapper></LoadingWrapper>;

const ImageTile = ({ imageUrl }) => {
  const [loaded, setLoaded] = useState(false);
  const [loadedImageUrl, setLoadedImageUrl] = useState("");

  let bgImg = new Image();
  bgImg.src = imageUrl;

  bgImg.onload = function () {
    setLoaded(true);
    setLoadedImageUrl(imageUrl);
  };

  return loaded ? (
    <Wrapper imageUrl={loadedImageUrl}></Wrapper>
  ) : (
    <Loading></Loading>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;

  border-radius: 4px;

  background-image: url(${(props) => props.imageUrl});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;

export default ImageTile;
