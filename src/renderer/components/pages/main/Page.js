import React from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import NavBar from "../../organisms/NavBar";
import Header from "../../organisms/Header";
import Gallery from "../../organisms/Gallery";
import Map from "../../organisms/Map";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainPage = ({
  onSettingsClick = () => null,
  task,
  images = [],
  imagesWithLocation = [],
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Wrapper>
      <NavBar onSettingsClick={onSettingsClick} />
      <Header task={task} />

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
        <Tab style={{ fontFamily: "Poppins, sans-serif" }} label="Memories" />
        <Tab style={{ fontFamily: "Poppins, sans-serif" }} label="Map" />
      </Tabs>
    </Paper>
  );
};

export default MainPage;

// TODO: feature: https://material-ui.com/components/tabs/#tabs
