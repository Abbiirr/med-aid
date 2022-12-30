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
  { id: 1, title: "Popular Medical Center", lat: 23.739316132485936, lng: 90.38226770352782 },
  { id: 2, title: "Apollo Hospital", lat: 23.820008651572735, lng: 90.4525850998742 },
  { id: 3, title: "Medinova Medical Center", lat: 23.741637827086095, lng: 90.37508581768606 },
];

//23.739316132485936, 90.38226770352782
//23.820008651572735, 90.4525850998742
//23.741637827086095, 90.37508581768606

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
        //center 23.948376516259003, 90.37921708900197
        defaultCenter={{ lat: 23.948376516259003, lng: 90.37921708900197 }}
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
