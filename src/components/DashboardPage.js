import React from "react";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";

import ImageGallery from "./DashboardImageGallery";
import Header from "./DashboardHeader";

import appStore from "../store";

const Wrapper = styled.div`
  height: 100%;
`;

export const DashboardPage = ({ imageList = [] }) => {
  return (
    <Wrapper>
      <Header></Header>
      <ImageGallery imageList={appStore.imageList}></ImageGallery>
    </Wrapper>
  );
};

export default view(DashboardPage);
