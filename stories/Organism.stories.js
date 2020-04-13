import React from "react";
import ImageGalleryComp from "../src/components/ImageGallery";

export default {
  title: "Organisms",
  components: ImageGalleryComp,
};

const imageList = [
  {
    hash: "0f4efac006ac9ba553a4c235e9186f02",
    path:
      "https://images.unsplash.com/photo-1578922746465-3a80a228f223?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80",
    tags: ["cat", "dog"],
  },
  {
    hash: "70ff4777b43bd5bc5e357321bb602a8a",
    path:
      "https://images.unsplash.com/photo-1582449632319-5247b79dd198?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80",
    tags: ["cat", "dog"],
  },
  {
    hash: "01a1a54f5969069a2082485b408a5e66",
    path:
      "/home/alain/Downloads/test_pictures/IMG-20160911-WA0005 (19th copy).jpg",
    tags: ["cat", "dog"],
  },
  {
    hash: "35163494c8e2f993a368e3e27ffb7566",
    path:
      "/home/alain/Downloads/test_pictures/IMG-20160911-WA0005 (3rd copy).jpg",
    tags: ["cat", "dog"],
  },
];

export const ImageGallery = () => (
  <ImageGalleryComp imageList={imageList}></ImageGalleryComp>
);
