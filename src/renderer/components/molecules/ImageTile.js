import React from "react";
import PropTypes from "prop-types";
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

const ImageTile = ({ imageUrl }) => <Wrapper imageUrl={imageUrl} />;

ImageTile.PropTypes = {
  imageUrl: PropTypes.string,
};

ImageTile.defaultProps = {
  imageUrl: "",
};

export default ImageTile;
