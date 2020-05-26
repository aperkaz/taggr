import React, { useState } from "react";
import { SizeMe } from "react-sizeme";
import PropTypes from "prop-types";
import { FixedSizeGrid } from "react-window"; // Virtualize list for performance https://github.com/developerdizzle/react-virtual-list
import Carousel, { Modal, ModalGateway } from "react-images";
import ImageTile from "../molecules/ImageTile";

// TODONOW: replace with: https://codesandbox.io/s/simple-react-lightbox-t6dbq?file=/src/App.js

const GUTTER = 10;
const ELEMENTS_PER_COLLUMN = 5;

const Gallery = ({ imageList }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imagePreview, setImagePreview] = useState(false);

  const openPreview = (index) => {
    setSelectedIndex(index);
    setImagePreview(true);
  };

  return (
    <div style={{ height: "100%" }}>
      <SizeMe monitorHeight>
        {({ size }) => (
          <div
            style={{
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Grid size={size} imageList={imageList} onCellClick={openPreview} />
          </div>
        )}
      </SizeMe>
      <ModalGateway>
        {imagePreview ? (
          <Modal onClose={() => setImagePreview(!imagePreview)}>
            <Carousel
              // TODO: improvement: allow carousel to render multiple images. Currently does not support lazy loading, so very slow. https://github.com/jossmac/react-images/issues/300
              // TODO: add index, and dynamically cahnge the view data
              currentIndex={0}
              views={[
                {
                  source: imageList[selectedIndex].path,
                },
              ]}
              components={{ Footer: () => <div></div> }}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};

const Grid = ({ size: { height, width }, imageList, onCellClick }) => {
  const gridHeight = height - GUTTER * 2;
  const gridWidth = width - GUTTER * 2;

  const columnWidth = gridWidth / ELEMENTS_PER_COLLUMN;
  const rowCount = Math.ceil(imageList.length / ELEMENTS_PER_COLLUMN);

  // min row height: 250
  const rowHeight =
    gridHeight / ELEMENTS_PER_COLLUMN > 250
      ? gridHeight / ELEMENTS_PER_COLLUMN
      : 250;

  // TODO: improve: add loading spinner /image
  // if (!imageList.length)
  // return <div>Sorry, no results. Add more pics into the root folder X.</div>;

  return (
    <FixedSizeGrid
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
        margin: "10px",
        // paddingRight: "20px",
      }}
    >
      {(props) => <Cell {...props} onClick={onCellClick} />}
    </FixedSizeGrid>
  );
};

const Cell = ({ columnIndex, rowIndex, style, data, onClick }) => {
  const height = style.height - GUTTER;
  const width = style.width - GUTTER;

  const index = rowIndex * ELEMENTS_PER_COLLUMN + columnIndex;
  return (
    <div
      key={columnIndex + ":" + rowIndex}
      style={{ ...style, height, width }}
      onClick={() => (data[index] ? onClick(index) : "")}
    >
      {data[index] ? (
        <ImageTile imageUrl={data[index] ? data[index].path : ""}></ImageTile>
      ) : null}
    </div>
  );
};

Gallery.defaultProps = {
  imageList: [],
};

Gallery.PropTypes = {
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      hash: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      path: PropTypes.string,
    })
  ),
};

export default React.memo(Gallery);

// TODO: future feature: image menu: https://github.com/aperkaz/taggr/blob/add-react/src/components/DashboardImageGallery.js
// TODO: update: lazy load images in carousel https://github.com/Aljullu/react-lazy-load-image-component