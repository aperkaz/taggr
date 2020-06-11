import React, { useState } from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Filters from "../../organisms/Filters";
import Header from "../../organisms/Header";

import NavBar from "../../organisms/NavBar";

import Gallery from "../../organisms/Gallery";
import Map from "../../organisms/Map";

const Wrapper = styled.div`
  margin: 0.5em 1em;

  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainPage = ({
  onSettingsClick,
  onSearchTriggered,
  task,
  // onFilterChange = () => null,
  images = [],
  imagesWithLocation = [],
}) => {
  const [isFiltersOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Wrapper>
      <Filters
        isOpen={isFiltersOpen}
        triggerFiltersClose={() => setIsFilterOpen(false)}
        triggerSearch={onSearchTriggered}
      />
      <Header
        // TODO: add task completion
        // task={task}
        onFiltersClick={() => setIsFilterOpen(true)}
        onSettingsClick={onSettingsClick}
      />
      <NavBar
        tabList={["Timeline", "Gallery", "Map"]}
        activeTab={activeTab}
        handleChange={setActiveTab}
      />
      {activeTab === 0 ? <div>timeline</div> : null}
      {activeTab === 1 ? <div>gallery</div> : null}
      {activeTab === 2 ? <div>map</div> : null}
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
