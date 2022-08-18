// MyGoogleMaps.js
import React, { Component } from "react";

import GoogleMapReact from "google-map-react";
import AutoComplete from "./AutoComplete";
import styled from "styled-components";
import Marker from "./Marker";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Grid } from "@mui/material";
import "./index.module.less";

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

function createMapOptions(maps) {
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.TOP_LEFT,
      style: maps.ZoomControlStyle.SMALL,
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_LEFT,
    },
    mapTypeControl: true,
    fullscreenControl: true,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
  };
}

class MyGoogleMap extends Component {
  state = {
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
    geoCoder: null,
    places: [],
    center: [
      this.props.mapAddress.lat ? Number(this.props.mapAddress.lat) : 24.8607,
      this.props.mapAddress.lng ? Number(this.props.mapAddress.lng) : 67.0011,
    ],
    zoom: this.props.mapAddress.address !== "" ? 14 : 12,
    address: "",
    draggable: true,
    lat: this.props.mapAddress ? Number(this.props.mapAddress.lat) : 24.8607,
    lng: this.props.mapAddress ? Number(this.props.mapAddress.lng) : 67.0011,
  };

  componentWillMount() {
    this.props.mapAddress.address !== ""
      ? console.log(this.state)
      : this.setCurrentLocation();
  }
  HandleTypedAddress = (address) => {
    this.setState({
      ...this.state,
      address: address,
    });
  };

  onMarkerInteraction = (childKey, childProps, mouse) => {
    this.setState({
      ...this.state,
      draggable: false,
      lat: mouse.lat,
      lng: mouse.lng,
    });
    this.props.setMapAddress({
      address: this.state.address,
      lat: mouse.lat,
      lng: mouse.lng,
    });
  };
  onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
    this.setState({ ...this.state, draggable: true });
    this._generateAddress();
  };

  _onChange = ({ center, zoom }) => {
    this.setState({
      ...this.state,
      center: center,
      zoom: zoom,
    });
    this.props.setMapAddress({
      address: this.state.address,
      lat: this.state.lat,
      lng: this.state.lng,
    });
  };

  _onClick = (value) => {
    this.setState({
      ...this.state,
      lat: value.lat,
      lng: value.lng,
    });
    this._generateAddress();
    this.props.setMapAddress({
      address: this.state.address,
      lat: this.state.lat,
      lng: this.state.lng,
    });
  };
  setLiveLocation = async () => {
    const LatLng = await this.setCurrent();
    this.setState({
      ...this.state,
      address: "",
    });
    this._generateLocAddress(LatLng.lat, LatLng.lng);
  };
  menuStyle = {
    borderRadius: "3px",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
    background: "rgba(255, 255, 255, 0.9)",
    padding: "2px 0",
    fontSize: "90%",
    position: "fixed",
    overflow: "auto",
    maxHeight: "50%", // TODO: don't cheat, let it flow to the bottom
    zIndex: 100,
  };
  apiHasLoaded = (map, maps) => {
    this.setState({
      ...this.state,
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
  };
  setLatLang = ({ lat, lng }) => {
    this.setState({
      ...this.state,
      center: { lat, lng },
      lat,
      lng,
    });
    this._generateLocAddress(lat, lng);
  };
  addPlace = (place) => {
    this.setState({
      ...this.state,
      places: [place],
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    this._generateAddress();
  };

  _generateAddress() {
    const { mapApi } = this.state;

    const geocoder = new mapApi.Geocoder();

    geocoder.geocode(
      { location: { lat: this.state.lat, lng: this.state.lng } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.setState({ address: results[0].formatted_address });
            this.props.setMapAddress({
              address: results[0].formatted_address,
              lat: this.state.lat,
              lng: this.state.lng,
            });
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  _generateLocAddress(Lat, Lng) {
    const { mapApi } = this.state;

    const geocoder = new mapApi.Geocoder();

    geocoder.geocode(
      { location: { lat: Lat, lng: Lng } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.setState({ address: results[0].formatted_address });
            this.props.setMapAddress({
              address: results[0].formatted_address,
              lat: Lat,
              lng: Lng,
            });
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  // Get Current Location Coordinates
  setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          center: [position.coords.latitude, position.coords.longitude],
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        this.props.setMapAddress({
          address: this.state.address,
          lat: this.state.lat,
          lng: this.state.lng,
        });
      });
    }
  }

  //  Get Local Address
  setCurrent() {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({
            center: [position.coords.latitude, position.coords.longitude],
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          var loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          resolve(loc);
        });
      }
    });
  }

  render() {
    return (
      <Wrapper>
        <Grid container>
          <Grid item xs={10} sm={11}>
            <AutoComplete
              setLatLang={this.setLatLang}
              address={this.state.address}
              HandleTypedAddress={this.HandleTypedAddress}
            />
          </Grid>
          <Grid item xs={2} sm={1}>
            <span
              style={{
                width: "auto",
                background: "#BA3BFA",
                color: "white",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                height: "50px",
                position: "relative",
                right: "0px",
                top: "0px",
                cursor: "pointer",
              }}
              onClick={this.setLiveLocation}
            >
              <MyLocationIcon />
            </span>
          </Grid>
        </Grid>
        <div style={{ width: "100%", height: "60vh" }}>
          <GoogleMapReact
            center={this.state.center}
            zoom={this.state.zoom}
            draggable={this.state.draggable}
            onChange={this._onChange}
            options={createMapOptions}
            onChildMouseDown={this.onMarkerInteraction}
            onChildMouseUp={this.onMarkerInteractionMouseUp}
            onChildMouseMove={this.onMarkerInteraction}
            onClick={this._onClick}
            bootstrapURLKeys={{
              key: process.env.GOOGLE_MAP_API,
              libraries: ["places", "geometry"],
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
          >
            <Marker
              text={
                this.props.mapAddress
                  ? this.props.mapAddress.address
                  : this.state.address
              }
              lat={
                this.props.mapAddress
                  ? this.props.mapAddress.lat
                  : this.state.lat
              }
              lng={
                this.props.mapAddress
                  ? this.props.mapAddress.lng
                  : this.state.lng
              }
            />
          </GoogleMapReact>
        </div>
      </Wrapper>
    );
  }
}

export default MyGoogleMap;
