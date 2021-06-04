import React, { useState } from 'react';
import styled from 'styled-components';

import Header from '../../organisms/Header';
import Filters from '../../organisms/Filters';
import FiltersLoading from '../../organisms/FiltersLoading';
import Gallery from '../../organisms/Gallery';
import Faces from '../../organisms/Faces';
import Map from '../../organisms/Map';

// TODONOW: fix shared entitiens, yarn modules?
// import { ImageType, ProgressType } from "../../../../shared/entities";
type ImageType = any;
type ProgressType = any;

const Wrapper = styled.div`
  height: 100vh;

  background-color: white;

  display: flex;
  flex-direction: row;
`;

const HeaderWrapper = styled.div`
  height: 50px;
`;

const FilterWrapper = styled.div`
  padding: 1rem;
`;

const ContentPanel = styled.div`
  flex-grow: 1;
  padding: 1rem 1rem 1rem 0;

  max-width: 100vw;

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
  progress: ProgressType;
  images: ImageType[];
  imagesWithLocation: ImageType[];
  onSettingsClick: () => void;
  onSearchTriggered: (filters: any) => void;
};

const DashboardPage = ({
  isProcessing,
  progress,
  images,
  imagesWithLocation = [],
  onSettingsClick,
  onSearchTriggered
}: Props) => {
  const [activeTab, setActiveTab] = useState(1);

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
            tabList={['Faces', 'Gallery', 'Map']}
            activeTab={activeTab}
            onActiveTabChange={setActiveTab}
            onSettingsClick={onSettingsClick}
            showSettings={!isProcessing}
          />
        </HeaderWrapper>
        {activeTab === 0 && (
          <ContentWrapper>
            <Faces />
          </ContentWrapper>
        )}
        {activeTab === 1 && (
          <ContentWrapper>
            <Gallery imageList={images} />
          </ContentWrapper>
        )}
        {activeTab === 2 && (
          <ContentWrapper>
            <Map imageList={imagesWithLocation as any} />
          </ContentWrapper>
        )}
      </ContentPanel>
    </Wrapper>
  );
};

export default DashboardPage;
