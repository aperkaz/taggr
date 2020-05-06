import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const normalizeImageUrl = (imagePath) => {
  const normalize = require("normalize-path");

  // fixes linux / windows compatibility
  const normalizedImagePath = normalize(imagePath);
  return normalizedImagePath.startsWith("http")
    ? normalizedImagePath
    : `file:///${normalizedImagePath}`;
};

// TODO: replace by react image load component, nicer load animation
const ImageTile = ({ imageUrl }) => <Container imageUrl={imageUrl} />;

const Container = styled.div`
  height: 100%;
    width: 100%;
    border-radius: 4px;
    background-image: url('${(props) => normalizeImageUrl(props.imageUrl)}');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
`;

ImageTile.propTypes = {
  imageUrl: PropTypes.string,
};

ImageTile.defaultProps = {
  imageUrl: "",
};

export default ImageTile;
