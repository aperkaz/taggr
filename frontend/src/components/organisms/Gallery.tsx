import React, { useState } from "react";
import { SizeMe } from "react-sizeme";
import { FixedSizeGrid } from "react-window"; // Virtualized list for performance https://github.com/developerdizzle/react-virtual-list
import FsLightbox from "fslightbox-react";

import Loading from "../molecules/Loading";
import ImageTile from "../molecules/ImageTile";

const GUTTER = 10;
const ELEMENTS_PER_COLLUMN = 5;

// TODONOW: extract to shared types, so they can be used by FE / BE
// TODONOW: use the typings in the store too
export type ImageType = {
  hash: string;
  path: string;
  tags: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
};

export type ImageWithLocationType = {
  hash: string;
  path: string;
  tags: string[];
  location: {
    latitude: number;
    longitude: number;
  };
};

type Props = {
  imageList: ImageType[] | null;
};

// imageList could be null or array
const Gallery = ({ imageList }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [toggler, setToggler] = useState(false);

  const openPreview = async (index: number) => {
    setSelectedIndex(index);
    // hack to prevent lightbox with isOpen: undefined
    await new Promise((r) => setTimeout(r, 10));
    setToggler(!toggler);
  };

  return (
    <div style={{ height: "100%" }}>
      {!imageList || imageList.length === 0 ? (
        <Loading
          text={`${
            !imageList
              ? "Searching for images"
              : "No pictures found, try to change the filters."
          }`}
        ></Loading>
      ) : (
        <>
          <SizeMe monitorHeight>
            {({ size }) => (
              <div
                style={{
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                <Grid
                  size={size}
                  imageList={imageList}
                  onCellClick={openPreview}
                />
              </div>
            )}
          </SizeMe>
          <FsLightbox
            toggler={toggler}
            sources={
              imageList && imageList[selectedIndex]
                ? [imageList[selectedIndex].path]
                : undefined
            }
            key={selectedIndex}
          />
        </>
      )}
    </div>
  );
};

type GridProps = {
  size: { height: number | null; width: number | null };
  imageList: ImageType[];
  onCellClick: (index: number) => void;
};
const Grid = ({
  size: { height, width },
  imageList,
  onCellClick,
}: GridProps) => {
  height = height ? height : 0;
  width = width ? width : 0;

  let gridHeight = height - GUTTER * 2;
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
        marginTop: ".5em",
      }}
    >
      {(props) => <Cell {...props} onClick={onCellClick} />}
    </FixedSizeGrid>
  );
};

type CellProps = {
  columnIndex: number;
  rowIndex: number;
  style: {
    height?: any;
    width?: any;
    [key: string]: any;
  };
  data: ImageType[];
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

export default React.memo(Gallery);
