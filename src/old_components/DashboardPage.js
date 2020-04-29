import React from "react";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import ImageGallery from "./DashboardImageGallery";
import Header from "./DashboardHeader";
import { UIStore, actions } from "../store";
import debounce from "lodash.debounce";

const Wrapper = styled.div`
  height: 100%;
`;

export const DashboardPage = () => {
  return (
    <Wrapper>
      <Header onInputChange={debounce(actions.setTagSearchValue, 300)}></Header>
      <ImageGallery imageList={UIStore.filteredImageList}></ImageGallery>
    </Wrapper>
  );
};

export default view(DashboardPage);
