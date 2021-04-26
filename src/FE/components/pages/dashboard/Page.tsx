/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState } from "react";
import styled from "styled-components";

import Header from "../../organisms/Header";
import Filters from "../../organisms/Filters";
import FiltersLoading from "../../organisms/FiltersLoading";
import Gallery from "../../organisms/Gallery";
import Faces from "../../organisms/Faces";
import Map from "../../organisms/Map";

const Wrapper = styled.div`
  height: 100vh;

  background-color: white;

  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  height: 50px;

  margin: 1rem 1rem 0;
`;

const ContentWrapper = styled.div`
  overflow: hidden;
  flex-grow: 1;
  display: flex;
`;

const FilterWrapper = styled.div`
  margin: 1rem;
`;

const ContentPanel = styled.div`
  flex-grow: 1;
  margin: 1rem 1rem 1rem 0;
`;

const DashboardPage = ({
  isProcessing,
  progress,
  images,
  imagesWithLocation = [],
  onSettingsClick,
  onSearchTriggered,
}) => {
  const [activeTab, setActiveTab] = useState(1);

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
            {isProcessing ? (
              <FiltersLoading
                current={progress.current}
                total={progress.total}
              />
            ) : (
              <Filters onFilterChange={onSearchTriggered} />
            )}
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

export default DashboardPage;
