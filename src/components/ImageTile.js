import React, { useState, useEffect } from "react";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  display: ${(props) => (props.loaded ? "none" : "block")};

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

const Loading = ({ loaded }) => (
  <LoadingWrapper loaded={loaded}></LoadingWrapper>
);

const ImageTile = ({ imageUrl, onClick }) => {
  const [loaded, setLoaded] = useState(false);

  let bgImg = new Image();
  bgImg.src = imageUrl;

  bgImg.onload = function () {
    setLoaded(true);
  };

  useEffect(() => {
    return function cleanupImgOnLoad() {
      bgImg.onload = null;
    };
  }, []);

  return (
    <React.Fragment>
      <Wrapper imageUrl={imageUrl} loaded={loaded} onClick={onClick}></Wrapper>
      <Loading loaded={loaded}></Loading>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  display: ${(props) => (props.loaded ? "block" : "none")};

  height: 100%;
  width: 100%;

  border-radius: 4px;

  background-image: url('${(props) => props.imageUrl}');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;

export default ImageTile;
