import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Header from "../../shared/Header";
import Search from "../../shared/Search";
import Gallery from "../../shared/VirtualizedGallery";

// TODO: feature: https://material-ui.com/components/tabs/#tabs

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainPage = ({
  onSettingsClick,
  onInputChange,
  onPressReset,
  tags,
  images,
}) => (
  <Wrapper>
    <Header onSettingsClick={onSettingsClick} />
    <Search
      onInputChange={onInputChange}
      onPressReset={onPressReset}
      tagCountList={tags}
    />
    <Gallery imageList={images} />
  </Wrapper>
);

MainPage.defaultProps = {
  task: {
    isOngoing: false,
    name: "",
    percentage: 0,
  },
};

MainPage.PropTypes = {
  onSettingsClick: PropTypes.func.isRequired,
  task: PropTypes.shape({
    isOngoing: PropTypes.bool,
    name: PropTypes.string,
    percentage: PropTypes.number,
  }),
  onInputChange: PropTypes.func.isRequired,
  onPressReset: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
    })
  ).isRequired,
};

export default MainPage;
