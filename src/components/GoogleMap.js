import React, {useEffect,useState, Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import Axios from 'axios';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: -1.2884,
            lng: 36.8233
          }
        }
      />
    );
  }
}

function Data() {
    const [location, getLocation] = useState("");

    useEffect(() => {
        Axios.get("http://localhost:5000/events").then((response) => {
            getLocation(response.data);
            console.log(response);
        });;
    }, [location]);
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);