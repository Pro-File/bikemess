// MarkCurrentLocation.js
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: absolute;
    width: 30px;
    height: 30px;
    background-image: url("https://img.icons8.com/ios-glyphs/30/000000/order-delivered.png");
    background-size: contain;
    background-repeat: no-repeat;
    transform: translate(1000%,280%);
    cursor: pointer;
    
`;

const MarkCurrentLocation = (props) => {
    var setCurrentLocation = ()=> {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
               props.setMapAddress({lat: position.coords.latitude, lng:position.coords.longitude})
            });
        }
    }

    return(
        <Wrapper
        // alt={text}
        onClick={setCurrentLocation}
    />
    )
}

// Marker.defaultProps = {
//     onClick: null,
// };

// Marker.propTypes = {
//     onClick: PropTypes.func,
//     text: PropTypes.string.isRequired,
// };

export default MarkCurrentLocation;