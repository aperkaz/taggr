import React from "react";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";

import ImageGallery from "./ImageGallery";
import DashboardHeader from "./DashboardHeader";

const Wrapper = styled.div`
  height: 100%;
`;

// TODONOW: verify that it works with store
export const DashboardPage = ({ imageList = [] }) => {
  return (
    <Wrapper>
      <DashboardHeader></DashboardHeader>
      <ImageGallery imageList={imageList}></ImageGallery>
    </Wrapper>
  );
};

export default view(DashboardPage);
