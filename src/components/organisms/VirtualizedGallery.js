const { Component } = require("react");
const { html } = require("htm/react");
const PropTypes = require("prop-types");
const debounce = require("lodash.debounce");
// Virtualize list for performance https://github.com/developerdizzle/react-virtual-list
const { FixedSizeGrid: Grid } = require("react-window");
const ImageTile = require("../molecules/ImageTile");

const GUTTER = 5;

class VirtualizedGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dimensions: { height: 10, width: 10 },
      sizeSet: false,
    };

    this.setDimensions = this.setDimensions.bind(this);
    this.handleScroll = debounce(this.handleScroll.bind(this), 200);
  }

  setDimensions({ height, width }) {
    this.setState({
      dimensions: {
        height,
        width,
      },
    });
  }

  async componentDidMount() {
    window.addEventListener("resize", this.handleScroll);

    // hack to let htm render react and thus populate the node height
    await new Promise((r) => setTimeout(r, 50));

    this.setDimensions({
      height: this.container.offsetHeight,
      width: this.container.offsetWidth,
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleScroll);
  }

  handleScroll(e) {
    console.log("resize event");

    const element = document.getElementById("virtualized-gallery-wrapper");

    this.setState({
      dimensions: {
        height: element.offsetHeight,
        width: element.offsetWidth,
      },
    });
  }

  render() {
    const imageList = this.props.imageList;
    const {
      dimensions: { height, width },
    } = this.state;

    const gridHeight = height - GUTTER * 2;
    const gridWidth = width - GUTTER * 2;

    // min row height: 250
    const rowHeight = gridHeight / 4 > 250 ? gridHeight / 4 : 250;

    return html`
      <div
        ref=${(el) => (this.container = el)}
        id="virtualized-gallery-wrapper"
        style=${{ height: "100%", overflowY: "hidden" }}
      >
        <${Grid}
          className=${"Grid"}
          columnCount=${4}
          columnWidth=${gridWidth / 4}
          height=${gridHeight}
          rowCount=${imageList.length / 4}
          rowHeight=${rowHeight}
          width=${gridWidth}
          itemData=${imageList}
          style=${{ overflowX: "hidden", margin: "5px auto 0" }}
        >
          ${Cell}
        <//>
      </div>
    `;
  }
}

// TODONOW: access imageList by index, not 0
const Cell = ({ columnIndex, rowIndex, style, data }) => {
  const height = style.height - GUTTER;
  const width = style.width - GUTTER;

  // TODONOW: parametrize gallery elements
  const index = rowIndex * 4 + columnIndex;
  // console.log(data);
  // console.log(index);
  return html`<div
    key=${columnIndex + ":" + rowIndex}
    style=${{ ...style, height, width }}
  >
    <${ImageTile} imageUrl="${data[index].path}"><//>
  </div>`;
};

VirtualizedGallery.defaultProps = {
  imageList: [],
};

VirtualizedGallery.propTypes = {
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      hash: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      path: PropTypes.string,
    })
  ),
};

// feature: image menu: https://github.com/aperkaz/privatus/blob/add-react/src/components/DashboardImageGallery.js

module.exports = VirtualizedGallery;
