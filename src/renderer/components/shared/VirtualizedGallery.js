import React, { Component } from "react";
import { SizeMe } from "react-sizeme";
import memoize from "memoize-one";
import PropTypes from "prop-types";
import { FixedSizeGrid as Grid } from "react-window"; // Virtualize list for performance https://github.com/developerdizzle/react-virtual-list
import Carousel, { Modal, ModalGateway } from "react-images";
import debounce from "lodash.debounce";
import ImageTile from "./ImageTile";

const GUTTER = 5;
const ELEMENTS_PER_COLLUMN = 5;

// TODO: inprovement: refactor with https://github.com/bvaughn/react-virtualized-auto-sizer/
// https://github.com/ctrlplusb/react-sizeme

// TODONOW: re renders every time a calculation is done, see why.
// THE PROCESSING STATUS MODIFIES DASHBOARD, which forces the whole gallery to re-render

// TODO: update: lazy load images https://github.com/Aljullu/react-lazy-load-image-component

class VirtualizedGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      lightboxIsOpen: false,
    };

    this.toggleLightbox = this.toggleLightbox.bind(this);

    this.calculateCarouselImages = memoize((imageList) => {
      console.log("calculating carousel images");
      return imageList.map((image) => ({
        source: image.path,
      }));
    });
    this.prefixImagePaths = memoize(this.prefixImagePaths.bind(this));
  }

  toggleLightbox(selectedIndex) {
    this.setState((prevState) => ({
      ...prevState,
      lightboxIsOpen: !prevState.lightboxIsOpen,
      selectedIndex,
    }));
  }

  // Re-run the filter whenever the list array or filter text changes:
  prefixImagePaths(imagePathsList) {
    return imagePathsList.map((imagePath) => ({
      source: `file://${imagePath.path}`,
    }));
  }

  render() {
    const imageList = this.props.imageList;

    // console.log(this.props.size);

    const {
      // dimensions: { height, width },
      lightboxIsOpen,
      selectedIndex,
      // isLoading,
    } = this.state;

    const carouselImages = this.calculateCarouselImages(imageList);

    console.log("re render virtual");

    return (
      <SizeMe monitorHeight>
        {({ size }) => {
          console.log(size);
          const { height, width } = size;

          const gridHeight = height - GUTTER * 2;
          const gridWidth = width - GUTTER * 2;

          const columnWidth = gridWidth / ELEMENTS_PER_COLLUMN;

          const rowCount = Math.ceil(imageList.length / ELEMENTS_PER_COLLUMN);

          // min row height: 250
          const rowHeight =
            gridHeight / ELEMENTS_PER_COLLUMN > 250
              ? gridHeight / ELEMENTS_PER_COLLUMN
              : 250;

          return (
            <div
              ref={(el) => (this.container = el)}
              id="virtualized-gallery-wrapper"
              style={{ height: "100%", overflow: "hidden" }}
            >
              {imageList.length ? (
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
              ) : (
                <div>
                  Sorry, no results. Add more pics into the root folder X.
                </div>
              )}
              <ModalGateway>
                {lightboxIsOpen ? (
                  <Modal onClose={this.toggleLightbox}>
                    <Carousel
                      // TODONOW: fix to render carousel multiple images. Currently does not support lazy loading, so very slow. https://github.com/jossmac/react-images/issues/300
                      currentIndex={0}
                      views={[carouselImages[selectedIndex]]}
                      components={{ Footer: () => <div></div> }}
                    />
                  </Modal>
                ) : null}
              </ModalGateway>
            </div>
          );
        }}
      </SizeMe>
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

export default VirtualizedGallery;

// TODO: fuutre feature: image menu: https://github.com/aperkaz/taggr/blob/add-react/src/components/DashboardImageGallery.js
