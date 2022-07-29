import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import style from "./index.module.less";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const GoogleMaps = ({ center, data }) => {
  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };

  return (
    <div className={style.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_API }}
        defaultCenter={center}
        center={center}
        id='googlemap'
        defaultZoom={14}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        options={{ fullscreenControl: false }}
        onChildclick={""}
      >
        {data &&
          data.map((item) => {
            return (
              <div className={style.customMarker} lat={item.lat} lng={item.lng}>
                <LocationOnIcon className={style.marker} />
                <div className={style.customPopup}>{item.shopName}</div>
              </div>
            );
          })}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMaps;
