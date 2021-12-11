import React, {useEffect,useState, Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import Geocode from 'react-geocode';
import Axios from 'axios';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
      <LocationData />
      const eventLatitude = LocationData.latitude
      const eventLongitude = LocationData.longitude
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: eventLatitude,
            lng: eventLongitude
          }
        }
      />
    );
  }
}

function LocationData() {
    const [eventlocation, getLocation] = useState("");
    const [latitude, setLat] = useState();
    const [longitude, setLong] = useState();

    useEffect(() => {
        Axios.get("http://localhost:5000/map").then((response) => {
            getLocation(response.data);
            console.log(response);
        });;
    }, [eventlocation]);

    useEffect((eventlocation) => {
        if (eventlocation.data) {
        Geocode.fromAddress(eventlocation.data).then(
          response => {
            setLat(response.results[0].geometry.location.lat);
            setLong(response.results[0].geometry.location.lng);
            getLocation(response.data);
          }
        )}}, [latitude, longitude]
      )
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);