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
      //<LocationData />
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: LocationData.setLat,
            lng: LocationData.setLong
          }
        }
      />
    );
  }
}

function LocationData() {
    const [location, getLocation] = useState("");
    const [latitude, setLat] = useState();
    const [longitude, setLong] = useState();
    
    /*useEffect(() => {
        Axios.get("http://localhost:5000/calendar").then((response) => {
            getEvent(response.data);
            console.log(response);
        });;
    }, [location]); */

    useEffect(() => {
        Geocode.fromAddress(location.data).then(
          response => {
            setLat(response.results[0].geometry.location.lat);
            setLong(response.results[0].geometry.location.lng);
            getLocation(response.data);
          }
        )}, [location]
      )
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);