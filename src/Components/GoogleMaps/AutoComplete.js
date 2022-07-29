import {
  Grid,
  Typography,
  Divider,
  Paper,
  CircularProgress,
} from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./index.module.less";

class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

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

  handleChange = (address) => {
    this.setState({ address });
    this.props.HandleTypedAddress(address);
  };

  handleSelect = (address) => {
    this.props.HandleTypedAddress("");
    this.setState({address: ""})
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => this.props.setLatLang(latLng))
      .catch((error) => console.error("Error", error));
  };

  render() {
    return (
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexFlow: "column",
          marginBottom: "10px",
        }}
      >
        <PlacesAutocomplete
          hintText="Search by Name"
          value={this.state.address ? this.state.address : this.props.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            // <div style={{display: "flex", justifyContent: "center", alignItems: "middle", flexFlow: "column"}}>
            <Grid container justify="center" style={{ width: "100%" }}>
              <input
                style={{
                  width: "100%",
                  padding: "10px 5px",
                  margin: "0px auto",
                  borderRadius: "0px !important",
                  border: "2px solid #BA3BFA",
                }}
                {...getInputProps({
                  placeholder: "Enter your desired location here . . .",
                  className: "location-search-input",
                })}
              />
              <Paper
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  position: "absolute",
                  top: "100%",
                  zIndex: "5000",
                }}
              >
                {loading && (
                  <Grid
                    container
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress
                      variant={"indeterminate"}
                      align={"center"}
                      size={"2rem"}
                    />
                  </Grid>
                )}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? {
                        backgroundColor: "#ffff",
                        cursor: "pointer",
                        color: "#BA3BFA",
                      }
                    : {
                        backgroundColor: "#F9EDFF",
                        cursor: "pointer",
                        color: "#9B9B9B",
                      };
                  return (
                    <Grid
                      key={suggestion.description}
                      container
                      direction="column"
                      style={{ padding: "10px 5px" }}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <Typography style={{ padding: "10px 5px" }}>
                        {suggestion.description}
                      </Typography>
                      <Divider variant="fullWidth" />
                    </Grid>
                  );
                })}
              </Paper>
            </Grid>
            // </div>
          )}
        </PlacesAutocomplete>
        <CancelIcon
          style={{
            position: "absolute",
            right: 5,
            color: "#BA3BFA",
            top: 15,
            height: 20,
            background: "#fafafa",
          }}
          onClick={() => {
            this.props.HandleTypedAddress("");
            this.setState({ address: "" });
          }}
        />
      </div>
    );
  }
}
export default AutoComplete;
