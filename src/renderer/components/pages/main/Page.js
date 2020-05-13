import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Header from "../../organisms/Header";
import Search from "../../organisms/Search";
import Gallery from "../../organisms/VirtualizedGallery";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainPage = ({ onSettingsClick, task, onInputChange, tags, images }) => (
  <Wrapper>
    <Header onSettingsClick={onSettingsClick} />
    <Search task={task} onInputChange={onInputChange} tagCountList={tags} />
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
  tags: PropTypes.array.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
    })
  ).isRequired,
};

export default MainPage;

// TODO: feature: https://material-ui.com/components/tabs/#tabs
