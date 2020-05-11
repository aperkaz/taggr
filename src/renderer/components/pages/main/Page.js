import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Search from "../../shared/Search";
import Gallery from "../../shared/VirtualizedGallery";

// TODO: https://material-ui.com/components/tabs/#tabs

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainPage = ({ onInputChange, onPressReset, tags, images }) => (
  <Wrapper>
    <Search
      onInputChange={onInputChange}
      onPressReset={onPressReset}
      tagCountList={tags}
    />
    <Gallery imageList={images} />
  </Wrapper>
);

MainPage.defaultProps = {
  onInputChange: () => console.log("onInputChange without prop"),
  onPressReset: () => console.log("onPressReset without prop"),
  tags: [],
  images: [],
};

MainPage.propTypes = {
  onInputChange: PropTypes.func,
  onPressReset: PropTypes.func,
  tags: PropTypes.array,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
    })
  ),
};

export default MainPage;
