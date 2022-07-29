import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import Container from "@material-ui/core/Container";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmFtaXNoMTIzIiwiYSI6ImNraWVlazBnMjFhNWoycWw2cjlhZXl2M3gifQ.LXLrmyTm38lrKMfc2dl0yw";

const ReadOnlyMap = ({ data }) => {
  const [state, setState] = useState({
    lng: data?.markers?.features[0]?.geometry?.coordinates[0] || 69.3451,
    lat: data?.markers?.features[0]?.geometry?.coordinates[1] || 30.3753,
    zoom: 12,
  });

  const color = [
    "#f44336",
    "#f50057",
    "#4caf50",
    "#2196f3",
    "#b23c17",
    "#9c27b0",
    "#ff9800",
    "#651fff",
    "#ffeb3b",
    "#cddc39",
    "#00bcd4",
    "#009688",
    "#FFA13B",
  ];

  const [popup, setPopup] = useState(false);

  const getRandomColor = () => {
    return color[Math.floor(Math.random() * (color.length - 1) + 1)];
  };

  useEffect(() => {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [state.lng, state.lat],
        zoom: state.zoom,
        //   maxBounds: bounds
      });
      map.addControl(new mapboxgl.FullscreenControl());
  
     // new mapboxgl.Marker().setLngLat([67.0631,25.0251]).addTo(map)
     // new mapboxgl.Marker({color:'red'}).setLngLat([67.067949,24.963991]).setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>")).addTo(map)
      map.on("load", function () {
        map.resize();
  
        //To map custom marker on map[']
        data && data.markers.features.forEach(function (marker) {
          // create a HTML element for each feature
          // var el = document.createElement("div");
          // el.className = "marker-" + marker.properties.status;
  
          // make a marker for each feature and add to the map
          new mapboxgl.Marker({color: `${getRandomColor()}`}).setLngLat(marker.geometry.coordinates).setPopup(
              new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(marker.properties.description)
            )
            .addTo(map);
        });
  
        map.addLayer({
          id: "maine",
          type: "fill",
          source: "maine", // reference the data source
          layout: {},
          paint: {
            "fill-color": "#0080ff", // blue color fill
            "fill-opacity": 0.5,
          },
        });
  
        map.addLayer({
          // id: "places",
          type: "fill",
          paint: {
            "fill-color": "orange",
            "fill-opacity": 0.5,
            "fill-outline-color": "red",
          },
        });
  
        map.on("click", "places", function (e) {
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(
              `Description: ${e.features[0].properties.description}<br/>Number:${e.features[0].properties.number}`
            )
            .addTo(map);
        });
  
        map.on("click", "karachi", function (e) {
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.title)
            .addTo(map);
        });
  
        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on("mouseenter", "karachi", function (e) {
          map.getCanvas().style.cursor = "pointer";
        });
      });
    }, []);

  return (
    <>
      <Container
        className="mapContainer"
        style={{
          // top: "35%",
          // bottom: 0,
          // width: open ? "72%" : "86.5%",
          height: "250px",
          transition: "width 0.2s",
          transitionTimingFunction: "ease-in-out",
        }}
        id="map"
      >
      </Container>
      <></>
    </>
  );
};

export default ReadOnlyMap;
