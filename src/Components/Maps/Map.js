import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import style from "./index.module.less";
import "mapbox-gl/dist/mapbox-gl.css";
import InputField from "./InputField";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXNhZHVsbGFoMDA3IiwiYSI6ImNrcGNiOHFsODAyZG0yb3A3M2Z3eXN1bmsifQ.3Npfx7gQ-lXbNWoYZEZxSA";

const Map = ({ data, height, width, top, right }) => {
  const [state, setState] = useState({
    lng: data?.markers?.features[0]?.geometry?.coordinates[0] || 69.3451,
    lat: data?.markers?.features[0]?.geometry?.coordinates[1] || 30.3753,
    zoom: 14,
  });

  const [searchedLocation, setSearchedLocation] = useState(null);

  const [refs, setRefs] = useState();
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
    if(searchedLocation){
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [searchedLocation.center[0], searchedLocation.center[1]],
        zoom: state.zoom,
        
        //   maxBounds: bounds
      });
      // map.addControl(new mapboxgl.FullscreenControl());
    
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
          new mapboxgl.Marker({color: `#ba3bfa`}).setLngLat(marker.geometry.coordinates).setPopup(
              new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(marker.properties.description)
            )
            .addTo(map);
        });
  
        //Custom markers when we click on them it shows popup
        // map.addSource("places", {
        //   type: "geojson",
        //   data: data?.markers,
        // });
  
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
        // Add a black outline around the polygon.
        // map.addLayer({
        //   id: "outline",
        //   type: "line",
        //   source: "maine",
        //   layout: {},
        //   paint: {
        //     "line-color": "#000",
        //     "line-width": 3,
        //   },
        // });
  
        map.addLayer({
          // id: "places",
          type: "fill",
          paint: {
            "fill-color": "orange",
            "fill-opacity": 0.5,
            "fill-outline-color": "red",
          },
          // source: "places",
          // layout: {
          //   "text-field": ["get", "description"],
          //   "text-field": ["get", "shopName"],
          //   "text-variable-anchor": ["top", "bottom", "left", "right"],
          //   "text-radial-offset": 1.5,
          //   "text-justify": "center",
          //   "icon-image": ["concat", ["get", "icon"], "-15"],
          // },
        });
  
        map.on("click", "places", function (e) {
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(
              `Description: ${e.features[0].properties.description}<br/>Number:${e.features[0].properties.number}`
            )
            // .setHTML(e.features[0].properties.description)
            // .setHTML(e.features[0].properties.number)
            .addTo(map);
        });
        // console.log("Cordinate", data);
        //Custom Polygon when we click on them it shows popup
        // map.addSource("karachi", {
        //   type: "geojson",
        //   data: data?.polygonJson,
        // });
        map.addLayer({
          id: "karachi",
          type: "fill",
          source: "karachi",
          layout: {},
          paint: {
            "fill-color": "#0080ff",
            "fill-opacity": 0,
          },
        });
  
        map.addLayer({
          id: "outline",
          type: "line",
          source: "karachi",
          layout: {},
          paint: {
            "line-color": "#000",
            "line-width": 3,
          },
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
  
        let temp;
        // map.on("mouseover", "karachi", (e) => {
        //   temp = new mapboxgl.Popup()
        //     .setLngLat(e.lngLat)
        //     .setHTML(e.features[0].properties.title)
        //     .addTo(map);
        // });
  
        // Change it back to a pointer when it leaves.
        // map.on("mouseleave", "karachi", function (e) {
        //   map.getCanvas().style.cursor = "";
        //   temp.remove();
        // });
      });
    }
    else{
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [state.lng, state.lat],
        zoom: state.zoom,
        //   maxBounds: bounds
      });

      // map.addControl(new mapboxgl.FullscreenControl());
  
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
          new mapboxgl.Marker({color: `#ba3bfa`}).setLngLat(marker.geometry.coordinates).setPopup(
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
    }

  }, [searchedLocation]);

  return (
    <>
      {/* <InputField searchedLocation={searchedLocation} setSearchedLocation={setSearchedLocation}/> */}
      <div
       className={style.mapContainerBox}
        id="map"
      >
      </div>
      <></>
    </>
  );
};

export default Map;
