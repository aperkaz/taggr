const { Component } = require("react");
const { html } = require("htm/react");
const PropTypes = require("prop-types");
const { FixedSizeGrid: Grid } = require("react-window"); // Virtualize list for performance https://github.com/developerdizzle/react-virtual-list
const debounce = require("lodash.debounce");
const ImageTile = require("../molecules/ImageTile");

const GUTTER = 5;
const ELEMENTS_PER_COLLUMN = 5;

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

    const columnWidth = gridWidth / ELEMENTS_PER_COLLUMN;

    const rowCount = Math.ceil(imageList.length / ELEMENTS_PER_COLLUMN);

    // min row height: 250
    const rowHeight =
      gridHeight / ELEMENTS_PER_COLLUMN > 250
        ? gridHeight / ELEMENTS_PER_COLLUMN
        : 250;

    return html`
      <div
        ref=${(el) => (this.container = el)}
        id="virtualized-gallery-wrapper"
        style=${{ height: "100%", overflowY: "hidden" }}
      >
        <${Grid}
          className=${"Grid"}
          columnCount=${ELEMENTS_PER_COLLUMN}
          columnWidth=${columnWidth}
          height=${gridHeight}
          rowCount=${rowCount}
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

const Cell = ({ columnIndex, rowIndex, style, data }) => {
  const height = style.height - GUTTER;
  const width = style.width - GUTTER;

  // TODO: clean: parametrize gallery elements
  const index = rowIndex * ELEMENTS_PER_COLLUMN + columnIndex;
  return html`<div
    key=${columnIndex + ":" + rowIndex}
    style=${{ ...style, height, width }}
  >
    ${data[index]
      ? html`<${ImageTile}
          imageUrl="${data[index] ? data[index].path : ""}"
        ><//>`
      : ""}
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

// feature: image menu: https://github.com/aperkaz/taggr/blob/add-react/src/components/DashboardImageGallery.js

module.exports = VirtualizedGallery;
