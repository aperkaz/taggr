import React from "react";
// const { shell } = require("electron").remote; // deconstructing assignment
import styled from "styled-components";
import ImageTile from "./ImageTile";
import Menu from "./Menu";

const Wrapper = styled.div`
  margin: 5px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 3820px) {
    width: 60%;
    margin: 5px auto;
  }
`;

const ImageWrapper = styled.div`
  padding: 5px;

  min-height: 200px;
  height: calc(25vh - 10px);

  min-width: 200px;
  width: calc(25% - 10px);
`;

// TODO: virtualize list for performance https://github.com/developerdizzle/react-virtual-list
const DashboardImageGallery = ({ imageList = [] }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  let menuProps = {
    options: [{ text: "Open image", onClick: (path) => console.log("hi") }],
    onClose: () => triggerMenuClose(),
  };

  function triggerMenuOpen(e) {
    console.log(e.currentTarget);
    setAnchorEl(e.currentTarget);
    console.log(menuProps);
  }

  function triggerMenuClose() {
    setAnchorEl(null);
  }

  return (
    <Wrapper>
      {imageList.map((image) => (
        <ImageWrapper key={image.hash}>
          <ImageTile
            imageUrl={image.path}
            onClick={triggerMenuOpen}
          ></ImageTile>
        </ImageWrapper>
      ))}
      {/* TODO: next feature */}
      {/* <Menu {...menuProps} anchorEl={anchorEl}></Menu> */}
    </Wrapper>
  );
};

export default DashboardImageGallery;
