import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import RoomIcon from "@material-ui/icons/Room";
import Link from "@material-ui/core/Link";
import Carousel, { Modal, ModalGateway } from "react-images";

const accessToken =
  "pk.eyJ1IjoidGFnZ3IiLCJhIjoiY2thMmJ0cGgyMDh2aDNocG5kZjcwaTdrOSJ9.dLriq493UOY4Jt-xZaAAZQ";

// TODO: improve: add backdrop when there are no images to show, with tip: https://material-ui.com/components/backdrop/
const Map = ({ imageList = [], onImageSelect = () => null }) => {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 1,
  });
  // const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imagePreview, setImagePreview] = useState(false);

  // useEffect(() => {
  //   const listener = (e) => {
  //     if (e.key === "Escape") {
  //       setSelectedIndex(0);
  //     }
  //   };
  //   window.addEventListener("keydown", listener);

  //   return () => {
  //     window.removeEventListener("keydown", listener);
  //   };
  // }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ReactMapGL
        width="100%"
        height="100%"
        {...viewport}
        mapboxApiAccessToken={accessToken}
        onViewportChange={(viewport) => {
          // prevent overriding the height and width: https://github.com/visgl/react-map-gl/issues/604#issuecomment-462398674
          const { width, height, ...etc } = viewport;
          setViewport(etc);
        }}
      >
        {imageList.map((image, index) => (
          <Marker
            // TODONOW: replace with hash
            // key={image.hash}
            key={index}
            latitude={image.location.lat}
            longitude={image.location.long}
          >
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setImagePreview(true);
                setSelectedIndex(index);
              }}
            >
              <RoomIcon />
            </Link>
          </Marker>
        ))}
      </ReactMapGL>
      <ModalGateway>
        {imagePreview ? (
          <Modal onClose={() => setImagePreview(!imagePreview)}>
            <Carousel
              currentIndex={0}
              views={[
                {
                  source: imageList[selectedIndex].path,
                },
              ]}
              components={{ Footer: () => <div></div> }}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};

export default React.memo(Map);

// TODONOW: fix position of marker, located at the top left of the icon, not bottom
