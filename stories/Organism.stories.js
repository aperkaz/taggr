import React from "react";
import { action } from "@storybook/addon-actions";
import ImageGalleryComp from "../src/components/ImageGallery";
import DashboardHeaderComp from "../src/components/DashboardHeader";
import FullHeight from "./utils";
import imageList from "./mocks/imageList";

export default {
  title: "Organisms",
  components: ImageGalleryComp,
};

export const ImageGallery = () => (
  <ImageGalleryComp imageList={imageList}></ImageGalleryComp>
);

export const DashboardHeader = () => (
  <FullHeight>
    <DashboardHeaderComp
      onInputChange={action("trigger search")}
    ></DashboardHeaderComp>
  </FullHeight>
);
