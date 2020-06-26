import React, { useState } from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Header from "../../organisms/Header";

import Filters from "../../organisms/Filters";

import Gallery from "../../organisms/Gallery";
import Faces from "../../organisms/Faces";
import Map from "../../organisms/Map";

const Wrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  height: 50px;

  margin: 1rem;
`;

const ContentWrapper = styled.div`
  overflow: hidden;
  flex-grow: 1;
  display: flex;
`;

const FilterWrapper = styled.div`
  margin: 0 0 1rem 1rem;
`;

// TODONOW: investigate. apparently there is a bug with the resize of images when resize.
const ContentPanel = styled.div`
  flex-grow: 1;
  margin: 0 1rem 1rem 1rem;
`;

const MainPage = ({
  onSettingsClick,
  onSearchTriggered,
  images,
  imagesWithLocation = [],
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Wrapper>
      <HeaderWrapper>
        <Header
          tabList={["Faces", "Gallery", "Map"]}
          activeTab={activeTab}
          onActiveTabChange={setActiveTab}
          onSettingsClick={onSettingsClick}
        />
      </HeaderWrapper>

      {activeTab === 0 ? (
        <ContentWrapper>
          <ContentPanel>
            <Faces />
          </ContentPanel>
        </ContentWrapper>
      ) : null}
      {activeTab === 1 ? (
        <ContentWrapper>
          <FilterWrapper>
            <Filters onFilterChange={onSearchTriggered} />
          </FilterWrapper>
          <ContentPanel>
            <Gallery imageList={images} />
          </ContentPanel>
        </ContentWrapper>
      ) : null}
      {activeTab === 2 ? (
        <ContentWrapper>
          <ContentPanel>
            <Map imageList={imagesWithLocation} />
          </ContentPanel>
        </ContentWrapper>
      ) : null}
    </Wrapper>
  );
};

/**
 * <Wrapper>
      <Filters
        isOpen={isFiltersOpen}
        triggerFiltersClose={() => setIsFilterOpen(false)}
        triggerSearch={onSearchTriggered}
      />

      <Header
        tabList={
          imagesWithLocation.length
            ? ["Gallery", "Faces", "Map"]
            : ["Gallery", "Faces"]
        }
        activeTab={activeTab}
        handleChange={setActiveTab}
      />
      <TabPanel value={activeTab} index={0}>
        gallery
       <Gallery imageList={images} /> 
        // </TabPanel>
        // <TabPanel value={activeTab} index={1}>
        //   <Faces />
        // </TabPanel>
        // <TabPanel value={activeTab} index={2}>
        //   <Map imageList={imagesWithLocation} />
        // </TabPanel>
  
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
 */

export default MainPage;
