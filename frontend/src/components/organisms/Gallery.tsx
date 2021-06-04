import React, { useState } from 'react';
import { FixedSizeGrid } from 'react-window'; // Virtualize list for performance https://github.com/developerdizzle/react-virtual-list
import FsLightbox from 'fslightbox-react';
import styled from 'styled-components';

import ImageTile from '../molecules/ImageTile';

import noResults from '../../statics/no-results.png';

// TODONOW: add entities
// import { ImageType } from "../../../shared/entities";
type ImageType = { hash: string; path: string };

const GUTTER = 16;
const ELEMENTS_PER_COLLUMN = 4;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  imageList: ImageType[];
};

const Gallery = ({ imageList = [] }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [toggler, setToggler] = useState(false);

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight - 96,
    width: window.innerWidth - 332 // remove filter offset
  });
  // @ts-ignore
  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight - 96,
        width: window.innerWidth - 332 // remove filter offset
      });
    }

    window.addEventListener('resize', handleResize);

    return (_: any) => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const handleCellSelect = async (index: number) => {
    // send to support page the support images
    if (imageList[index].hash === 'support-placeholder') {
      let shell = window.require('electron').shell;
      shell.openExternal('https://taggr.ai/#support');
      return;
    }

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
          style={{ filter: 'hue-rotate(30deg)' }}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div
        style={{
          height: '100%',
          overflow: 'hidden',
          width: '100%'
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
  imageList: ImageType[];
  onCellClick: (index: number) => void;
};

const Grid = ({
  size: { height, width },
  imageList,
  onCellClick
}: GridProps) => {
  height = height ? height : 0;
  width = width ? width : 0;

  // let gridHeight = height - GUTTER * 2;
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
      // overscanRowCount={10}
      // overscanColumnCount={10}
      style={{
        overflowX: 'hidden'
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
  data: ImageType[];
  onClick: (index: number) => void;
};
const Cell = ({ columnIndex, rowIndex, style, data, onClick }: CellProps) => {
  const height = style.height ? style.height - GUTTER : 0;
  const width = style.width ? style.width - GUTTER : 0;

  const index = rowIndex * ELEMENTS_PER_COLLUMN + columnIndex;
  return (
    <div
      key={columnIndex + ':' + rowIndex}
      style={{ ...style, height, width }}
      onClick={() => (data[index] ? onClick(index) : '')}
    >
      {data[index] ? (
        <ImageTile imageUrl={data[index] ? data[index].path : ''}></ImageTile>
      ) : null}
    </div>
  );
};

// export default React.memo(Gallery);
export default Gallery;

// TODO: future feature: image menu: https://github.com/aperkaz/taggr/blob/add-react/src/components/DashboardImageGallery.js
// TODO: update: lazy load images in carousel https://github.com/Aljullu/react-lazy-load-image-component
