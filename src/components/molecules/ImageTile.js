const { Component } = require("react");
const { html } = require("htm/react");

const Loading = () =>
  html`<div key="loading" className="dashboard__tile--loading"></div>`;

const styles = (imageUrl) => ({
  height: "100%",
  width: "100%",
  borderRadius: "4px",
  // TODO: add url recognition
  // backgroundImage: `url('${imageUrl}')`, // when in storybook
  backgroundImage: `url('file:///${imageUrl}')`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
});

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

// TODO: add proptypes

ImageTile.defaultProps = {
  imageUrl: "",
};

module.exports = ImageTile;
