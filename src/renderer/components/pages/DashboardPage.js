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

const DashboardPage = ({ onInputChange, onPressReset, tags, images }) => (
  <Wrapper>
    <Header
      onInputChange={onInputChange}
      onPressReset={onPressReset}
      tagCountList={tags}
    />
    <Gallery imageList={images} />
  </Wrapper>
);

DashboardPage.defaultProps = {
  onInputChange: () => console.log("onInputChange without prop"),
  onPressReset: () => console.log("onPressReset without prop"),
  tags: [],
  images: [],
};

DashboardPage.propTypes = {
  onInputChange: PropTypes.func,
  onPressReset: PropTypes.func,
  tags: PropTypes.array,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
    })
  ),
};

export default DashboardPage;