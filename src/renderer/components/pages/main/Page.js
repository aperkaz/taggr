import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Header from "../../organisms/Header";
import Search from "../../organisms/Search";
import Gallery from "../../organisms/VirtualizedGallery";
import Map from "../../organisms/Map";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainPage = ({
  onSettingsClick,
  task,
  onInputChange,
  tags,
  images,
  imagesWithLocation,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Wrapper>
      <Header onSettingsClick={onSettingsClick} />
      <Search task={task} onInputChange={onInputChange} tagCountList={tags} />

      <NavigationTabs value={value} handleChange={handleChange} />
      {value === 0 ? <Gallery imageList={images} /> : null}
      {value === 1 ? <Map imageList={imagesWithLocation} /> : null}
    </Wrapper>
  );
};

const NavigationTabs = ({ value, handleChange }) => {
  return (
    <Paper
      style={{
        flexGrow: 1,
        boxShadow:
          "0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12)",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Memories" />
        <Tab label="Map" />
      </Tabs>
    </Paper>
  );
};

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
