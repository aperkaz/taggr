import React, { useState } from "react";
import styled from "styled-components";
import ReactMapGL, { Marker } from "react-map-gl";
import RoomIcon from "@material-ui/icons/Room";
import Link from "@material-ui/core/Link";
import FsLightbox from "fslightbox-react";

const accessToken =
  "pk.eyJ1IjoidGFnZ3IiLCJhIjoiY2thMmJ0cGgyMDh2aDNocG5kZjcwaTdrOSJ9.dLriq493UOY4Jt-xZaAAZQ";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 1em;
  /* compensates for uneven css rules */
  margin-bottom: 1.5em;

  border-radius: 6px;
`;

// TODO: improve: add backdrop when there are no images to show, with tip: https://material-ui.com/components/backdrop/
const Map = ({ imageList = [] }) => {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toggler, setToggler] = useState(false);

  return (
    <Wrapper>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={accessToken}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/taggr/cka6yzzew11f71iogmj35drzc?optimize=true"
        attributionControl={false}
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
            // Given marker dimensions (H x W): 35 x 35 :https://material.io/resources/icons/?search=map&icon=room&style=baseline
            offsetTop={-35}
            offsetLeft={-17.5}
            latitude={image.location.latitude}
            longitude={image.location.longitude}
          >
            <Link
              href="#"
              onClick={async (e) => {
                e.preventDefault();
                setSelectedIndex(index);
                // hack to prevent lightbox with isOpen: undefined
                await new Promise((r) => setTimeout(r, 10));
                setToggler(!toggler);
              }}
            >
              <RoomIcon fontSize="large" />
            </Link>
          </Marker>
        ))}
      </ReactMapGL>
      <FsLightbox
        toggler={toggler}
        sources={[
          imageList[selectedIndex] ? imageList[selectedIndex].path : null,
        ]}
        key={selectedIndex}
      />
    </Wrapper>
  );
};

// If slow performance, consider geoJson: https://github.com/visgl/react-map-gl/issues/750

export default React.memo(Map);
