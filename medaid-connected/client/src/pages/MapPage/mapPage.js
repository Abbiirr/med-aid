import React from "react";
import "./styles.css";

import GoogleMapReact from "google-map-react";
import MyMarker from "./MyMarker";

// implementation of this function is needed for codesandbox example to work
// you can remove it otherwise
const distanceToMouse = (pt, mp) => {
  if (pt && mp) {
    // return distance between the marker and mouse pointer
    return Math.sqrt(
      (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
    );
  }
};

const points = [
  { id: 1, title: "Round Pond", lat: 51.506, lng: -0.184 },
  { id: 2, title: "The Long Water", lat: 51.508, lng: -0.175 },
  { id: 3, title: "The Serpentine", lat: 51.505, lng: -0.164 },
];

export default function Map() {
  return (
    <div className="App">
      <GoogleMapReact
        bootstrapURLKeys={{
          // remove the key if you want to fork
          key: "AIzaSyCaVIwiBNJH9ir_vMMJ9ucxFEolqNlt3XM",
          language: "en",
          region: "US",
        }}
        defaultCenter={{ lat: 51.506, lng: -0.169 }}
        defaultZoom={15}
        distanceToMouse={distanceToMouse}
      >
        {points.map(({ lat, lng, id, title }) => {
          return (
            <MyMarker key={id} lat={lat} lng={lng} text={id} tooltip={title} />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
