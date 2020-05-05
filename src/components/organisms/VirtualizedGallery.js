import React, { Component } from "react";
import memoize from "memoize-one";

import PropTypes from "prop-types";
import { FixedSizeGrid as Grid } from "react-window"; // Virtualize list for performance https://github.com/developerdizzle/react-virtual-list
import Carousel, { Modal, ModalGateway } from "react-images";
import debounce from "lodash.debounce";
import ImageTile from "../molecules/ImageTile";

const GUTTER = 5;
const ELEMENTS_PER_COLLUMN = 5;

// TODO: inprovement: refactor with https://github.com/bvaughn/react-virtualized-auto-sizer/

// TODONOW: re renders every time a calculation is done, see why.
// THE PROCESSING STATUS MODIFIES DASHBOARD, which forces the whole gallery to re-render
class VirtualizedGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dimensions: { height: 10, width: 10 },
      sizeSet: false,
      selectedIndex: 0,
      lightboxIsOpen: false,
    };

    this.setDimensions = this.setDimensions.bind(this);
    this.toggleLightbox = this.toggleLightbox.bind(this);

    this.calculateCarouselImages = memoize((imageList) => {
      console.log("calculating carousel images");
      return imageList.map((imagePath) => ({
        source: `file://${imagePath.path}`,
      }));
    });
    this.prefixImagePaths = memoize(this.prefixImagePaths.bind(this));
    this.handleScroll = debounce(this.handleScroll.bind(this), 200);
  }

  toggleLightbox(selectedIndex) {
    this.setState((prevState) => ({
      ...prevState,
      lightboxIsOpen: !prevState.lightboxIsOpen,
      selectedIndex,
    }));
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
    // on sezise event
    const element = document.getElementById("virtualized-gallery-wrapper");

    this.setState({
      dimensions: {
        height: element.offsetHeight,
        width: element.offsetWidth,
      },
    });
  }

  // Re-run the filter whenever the list array or filter text changes:
  prefixImagePaths(imagePathsList) {
    return imagePathsList.map((imagePath) => ({
      source: `file://${imagePath.path}`,
    }));
  }

  render() {
    const imageList = this.props.imageList;

    const {
      dimensions: { height, width },
      lightboxIsOpen,
      selectedIndex,
      // isLoading,
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

    const carouselImages = this.calculateCarouselImages(imageList);

    console.log("re render virtual");

    return (
      <div
        ref={(el) => (this.container = el)}
        id="virtualized-gallery-wrapper"
        style={{ height: "100%", overflow: "hidden" }}
      >
        <Grid
          className="Grid"
          columnCount={ELEMENTS_PER_COLLUMN}
          columnWidth={columnWidth}
          height={gridHeight}
          rowCount={rowCount}
          rowHeight={rowHeight}
          width={gridWidth}
          itemData={imageList}
          style={{
            overflowX: "hidden",
            margin: "5px 40px 5px 5px",
            paddingRight: "20px",
          }}
        >
          {(props) => <Cell {...props} onClick={this.toggleLightbox} />}
        </Grid>

        <ModalGateway>
          {lightboxIsOpen ? (
            <Modal onClose={this.toggleLightbox}>
              <Carousel
                // components={{ FooterCaption }}
                currentIndex={selectedIndex}
                // formatters={{ getAltText }}
                views={carouselImages}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  }
}

const Cell = ({ columnIndex, rowIndex, style, data, onClick }) => {
  const height = style.height - GUTTER;
  const width = style.width - GUTTER;

  // TODO: clean: parametrize gallery elements
  const index = rowIndex * ELEMENTS_PER_COLLUMN + columnIndex;
  return (
    <div
      key={columnIndex + ":" + rowIndex}
      style={{ ...style, height, width }}
      onClick={() => onClick(index)}
    >
      {data[index] ? (
        <ImageTile imageUrl={data[index] ? data[index].path : ""}></ImageTile>
      ) : (
        ""
      )}
    </div>
  );
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
export default VirtualizedGallery;
