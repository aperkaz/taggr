import React from "react";
import styled from "styled-components";

const Wrapper = styled.div<{ url: string }>`
  height: 100%;
  width: 100%;
  border-radius: 6px;
  background-image: url("${(props) => props.url}");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.24);
`;

type Props = {
  url: string;
};

const ImageTile = ({ url }: Props) => <Wrapper url={url} />;

export default ImageTile;
