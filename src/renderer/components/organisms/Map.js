import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import RoomIcon from "@material-ui/icons/Room";
import Link from "@material-ui/core/Link";

const accessToken =
  "pk.eyJ1IjoidGFnZ3IiLCJhIjoiY2thMmJ0cGgyMDh2aDNocG5kZjcwaTdrOSJ9.dLriq493UOY4Jt-xZaAAZQ";

// TODO: improve: add backdrop when there are no images to show, with tip: https://material-ui.com/components/backdrop/
export default function Map({ images = [], onImageSelect = () => null }) {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 1,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
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
      {images.map((image, index) => {
        return !image.location ? null : (
          <Marker
            // TODONOW: replace with hash
            // key={image.hash}
            key={index}
            latitude={image.location.latitude}
            longitude={image.location.longitude}
          >
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSelectedImage(image);

                onImageSelect(image);
              }}
            >
              <RoomIcon fontSize="medium" />
            </Link>
          </Marker>
        );
      })}
    </ReactMapGL>
  );
}
