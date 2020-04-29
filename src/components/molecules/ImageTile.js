import React, { Component } from "react";
import PropTypes from "prop-types";

const Loading = () => <div className="dashboard__tile--loading"></div>;

const normalizeImageUrl = (imagePath) => {
  const normalize = require("normalize-path");

  // fixes linux / windows compatibility
  const normalizedImagePath = normalize(imagePath);
  return `file:///${normalizedImagePath}`;
};

const styles = (imageUrl) => {
  // prefix non-http images (local)
  const url = imageUrl.startsWith("http")
    ? imageUrl
    : normalizeImageUrl(imageUrl);

  return {
    height: "100%",
    width: "100%",
    borderRadius: "4px",
    backgroundImage: `url('${url}')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
  };
};

const ImageComponent = ({ imageUrl }) => <div style={styles(imageUrl)}></div>;

// TODO: replace by react image load component, nicer load animation
class ImageTile extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
    this.bgImg = null;
  }

  componentDidMount() {
    if (!this.props.imageUrl) return;

    this.bgImg = new Image();
    this.bgImg.src = this.props.imageUrl;

    this.bgImg.onload = () => {
      this.setState({ loading: false });
    };
  }

  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <ImageComponent imageUrl={this.props.imageUrl} />
    );
  }
}

ImageTile.propTypes = {
  imageUrl: PropTypes.string,
};

ImageTile.defaultProps = {
  imageUrl: "",
};

export default ImageTile;
