import React from "react";
import PropTypes from "prop-types";

// TODONOW: add components
// const Header = require("../organisms/Header");
// const Gallery = require("../organisms/VirtualizedGallery");

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  galleryWrapper: {
    flexGrow: 1,
    overflowY: "hidden",
    margin: "5px 0",
  },
};

const DashboardPage = ({
  onInputChange,
  onPressReset,
  tagProcessingStatus,
  tagCountList,
  filteredImageList,
}) => (
  <div>
    Dashboard page
    {/* <Header
      onInputChange="{onInputChange}"
      onPressReset="{onPressReset}"
      tagProcessingStatus={tagProcessingStatus}
      tagCountList="{tagCountList}"
    />
    <div key="2">
      <Gallery imageList="{filteredImageList}" />
    </div> */}
  </div>
);

DashboardPage.defaultProps = {
  onInputChange: () => null,
  filteredImageList: [],
};

DashboardPage.propTypes = {
  onInputChange: PropTypes.func,
  filteredImageList: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
    })
  ),
};

export default DashboardPage;
