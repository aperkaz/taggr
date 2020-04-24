const { Component } = require("react");
const { html } = require("htm/react");
const PropTypes = require("prop-types");

const Loading = () =>
  html`<div key="loading" className="dashboard__tile--loading"></div>`;

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

const ImageComponent = ({ imageUrl, onClick }) =>
  html` <div key="imageComponent" style=${styles(imageUrl)}></div>`;

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
    return this.state.loading
      ? html`<${Loading} />`
      : html`<${ImageComponent} imageUrl=${this.props.imageUrl} />`;
  }
}

ImageTile.propTypes = {
  imageUrl: PropTypes.string,
};

ImageTile.defaultProps = {
  imageUrl: "",
};

module.exports = ImageTile;
