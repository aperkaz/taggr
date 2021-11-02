import React, { useState } from "react";
import { FixedSizeGrid } from "react-window"; // Virtualize list for performance https://github.com/developerdizzle/react-virtual-list
import FsLightbox from "fslightbox-react";
import styled from "styled-components";

import { sharedTypes } from "taggr-shared";
import ImageTile from "../molecules/ImageTile";
import noResults from "../../statics/no-results.png";

const GUTTER = 16;
const ELEMENTS_PER_COLLUMN = 4;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  imageList: sharedTypes.Image[];
  dimensions: {
    height: number;
    width: number;
  };
};

const Gallery = ({
  imageList,
  dimensions = { height: window.innerHeight, width: window.innerWidth },
}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [toggler, setToggler] = useState(false);

  const handleCellSelect = async (index: number) => {
    setSelectedIndex(index);
    // hack to prevent lightbox with isOpen: undefined
    await new Promise((r) => setTimeout(r, 10));
    setToggler(!toggler);
  };

  if (imageList.length === 0) {
    return (
      <Wrapper>
        <img
          src={noResults}
          height="250px"
          alt="placeholder"
          style={{ filter: "hue-rotate(30deg)" }}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div
        style={{
          height: "100%",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Grid
          size={dimensions}
          imageList={imageList}
          onCellClick={handleCellSelect}
        />
      </div>
      <FsLightbox
        toggler={toggler}
        sources={
          imageList[selectedIndex] ? [imageList[selectedIndex].path] : undefined
        }
        key={selectedIndex}
      />
    </Wrapper>
  );
};

type GridProps = {
  size: {
    height: number;
    width: number;
  };
  imageList: sharedTypes.Image[];
  onCellClick: (index: number) => void;
};

const Grid = ({
  size: { height, width },
  imageList,
  onCellClick,
}: GridProps) => {
  height = height ? height : 0;
  width = width ? width : 0;

  let gridHeight = height;
  let gridWidth = width;

  const columnWidth = gridWidth / ELEMENTS_PER_COLLUMN;
  const rowCount = Math.ceil(imageList.length / ELEMENTS_PER_COLLUMN);

  // min row height: 250
  const rowHeight =
    gridHeight / ELEMENTS_PER_COLLUMN > 250
      ? gridHeight / ELEMENTS_PER_COLLUMN
      : 250;

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
      }}
    >
      {(props) => <Cell {...props} onClick={onCellClick} />}
    </FixedSizeGrid>
  );
};

type CellProps = {
  columnIndex: number;
  rowIndex: number;
  style: any;
  data: sharedTypes.Image[];
  onClick: (index: number) => void;
};
const Cell = ({ columnIndex, rowIndex, style, data, onClick }: CellProps) => {
  const height = style.height ? style.height - GUTTER : 0;
  const width = style.width ? style.width - GUTTER : 0;

  const index = rowIndex * ELEMENTS_PER_COLLUMN + columnIndex;
  return (
    <div
      key={columnIndex + ":" + rowIndex}
      style={{ ...style, height, width }}
      onClick={() => (data[index] ? onClick(index) : "")}
    >
      {data[index] ? (
        <ImageTile url={data[index] ? data[index].path : ""}></ImageTile>
      ) : null}
    </div>
  );
};

export default Gallery;
