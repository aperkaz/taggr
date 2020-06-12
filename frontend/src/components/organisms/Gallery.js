import React, { useState } from "react";
import { SizeMe } from "react-sizeme";
import { FixedSizeGrid } from "react-window"; // Virtualize list for performance https://github.com/developerdizzle/react-virtual-list
import FsLightbox from "fslightbox-react";

import ImageTile from "../molecules/ImageTile";

const GUTTER = 10;
const ELEMENTS_PER_COLLUMN = 5;

const Gallery = ({ imageList = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [toggler, setToggler] = useState(false);

  const openPreview = async (index) => {
    setSelectedIndex(index);
    // hack to prevent lightbox with isOpen: undefined
    await new Promise((r) => setTimeout(r, 10));
    setToggler(!toggler);
  };

  return (
    <div style={{ height: "100%", marginTop: ".25em" }}>
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
      <FsLightbox
        toggler={toggler}
        sources={[
          imageList[selectedIndex] ? imageList[selectedIndex].path : null,
        ]}
        key={selectedIndex}
      />
    </div>
  );
};

const Grid = ({ size: { height, width }, imageList, onCellClick }) => {
  const gridHeight = height - GUTTER * 2;
  const gridWidth = width;

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
      // overscanRowCount={10}
      // overscanColumnCount={10}
      style={{
        overflowX: "hidden",
        marginTop: ".5em",
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

export default React.memo(Gallery);

// TODO: future feature: image menu: https://github.com/aperkaz/taggr/blob/add-react/src/components/DashboardImageGallery.js
// TODO: update: lazy load images in carousel https://github.com/Aljullu/react-lazy-load-image-component
