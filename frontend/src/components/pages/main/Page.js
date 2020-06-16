import React, { useState } from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Header from "../../organisms/Header";
import NavBar from "../../organisms/NavBar";

import Filters from "../../organisms/Filters";

import Gallery from "../../organisms/Gallery";
import Faces from "../../organisms/Faces";
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
        task={task}
        onFiltersClick={() => setIsFilterOpen(true)}
        onSettingsClick={onSettingsClick}
      />
      <NavBar
        tabList={
          imagesWithLocation.length
            ? ["Gallery", "Faces", "Map"]
            : ["Gallery", "Faces"]
        }
        activeTab={activeTab}
        handleChange={setActiveTab}
      />
      {activeTab === 0 ? <Gallery imageList={images} /> : null}
      {activeTab === 1 ? <Faces /> : null}
      {activeTab === 2 ? (
        imagesWithLocation.length ? (
          <Map imageList={imagesWithLocation} />
        ) : (
          setActiveTab(0)
        )
      ) : null}
    </Wrapper>
  );
};

export default MainPage;
