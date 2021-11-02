import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Header from "../../organisms/Header";
import Filters from "../../organisms/Filters";
import FiltersLoading from "../../organisms/FiltersLoading";
import Gallery from "../../organisms/Gallery";
import Map from "../../organisms/Map";
import { ImageType } from "taggr-shared/src/types";

const HEADING_HEIGHT_PX = 106;
const FILTERS_WIDTH_PX = 332;

const Wrapper = styled.div`
  height: 100vh;
  max-width: 100vw;

  background-color: white;

  display: flex;
  flex-direction: row;
`;

const HeaderWrapper = styled.div`
  height: 50px;
  padding-bottom: 0.5rem;
`;

const FilterWrapper = styled.div`
  padding: 1rem;
`;

const ContentPanel = styled.div`
  flex: 1 1 auto;
  padding: 1rem 1rem 1rem 0;

  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  margin-top: 1rem;

  min-width: 100%;
  max-width: 100%;
  flex-grow: 1;
`;

type Props = {
  isProcessing: boolean;
  progress: React.ComponentProps<typeof FiltersLoading>;
  images: ImageType[];
  imagesWithLocation: ImageType[];
  onSettingsClick: React.ComponentProps<typeof Header>["onSettingsClick"];
  onSearchTriggered: React.ComponentProps<typeof Filters>["onFilterChange"];
};

const DashboardPage = ({
  isProcessing,
  progress,
  images,
  imagesWithLocation = [],
  onSettingsClick,
  onSearchTriggered,
}: Props) => {
  const [activeTab, setActiveTab] = useState(0);

  // The virtualized library has a rendering bug, this window listener fixes that
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight - HEADING_HEIGHT_PX,
    width: window.innerWidth - FILTERS_WIDTH_PX,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight - HEADING_HEIGHT_PX,
        width: window.innerWidth - FILTERS_WIDTH_PX,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Wrapper>
      <FilterWrapper>
        {isProcessing ? (
          <FiltersLoading current={progress.current} total={progress.total} />
        ) : (
          <Filters onFilterChange={onSearchTriggered} />
        )}
      </FilterWrapper>

      <ContentPanel>
        <HeaderWrapper>
          <Header
            tabList={["Gallery", "Map"]}
            activeTab={activeTab}
            onActiveTabChange={setActiveTab}
            onSettingsClick={onSettingsClick}
            showSettings={!isProcessing}
          />
        </HeaderWrapper>
        {activeTab === 0 && (
          <ContentWrapper>
            <Gallery imageList={images} dimensions={dimensions} />
          </ContentWrapper>
        )}
        {activeTab === 1 && (
          <ContentWrapper>
            <Map imageList={imagesWithLocation as any} />
          </ContentWrapper>
        )}
      </ContentPanel>
    </Wrapper>
  );
};

export default DashboardPage;
