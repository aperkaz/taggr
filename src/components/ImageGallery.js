import React from "react";
import ImageTile from "./ImageTile";

// TODO: virtualize list for performance https://github.com/developerdizzle/react-virtual-list
const ImageGallery = ({ imageList }) => (
  <div>
    a
    {imageList.map((image) => (
      <div key={image.hash} style={{ height: "30px", width: "50px" }}>
        <ImageTile imageUrl={image.path}></ImageTile>
      </div>
    ))}
  </div>
);

export default ImageGallery;
