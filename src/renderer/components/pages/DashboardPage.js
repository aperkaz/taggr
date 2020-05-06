import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Header from "../organisms/Header";
import Gallery from "../organisms/VirtualizedGallery";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const DashboardPage = ({
  onLogoClick,
  onInputChange,
  onPressReset,
  tagProcessingStatus,
  tagCountList,
  filteredImageList,
}) => (
  <Wrapper>
    <Header
      onLogoClick={onLogoClick}
      onInputChange={onInputChange}
      onPressReset={onPressReset}
      tagProcessingStatus={tagProcessingStatus}
      tagCountList={tagCountList}
    />
    <Gallery imageList={filteredImageList} />
  </Wrapper>
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
