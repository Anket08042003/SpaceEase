import { UserLocationContext } from "@/context/UserLocationContext";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import React, { useContext, useEffect, useState } from "react";
import Markers from "./Markers";

function GoogleMapView({ businessList }) {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const [map, setMap] = useState();

  const containerStyle = {
    width: "100%",
    height: "500px",
  };
  useEffect(()=>{
    console.log(userLocation)
  },[])
  const coordinates = { lat: -34.397, lng: 150.644 };
  return (
    <div>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        mapIds={["327f00d9bd231a33"]}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          // center={userLocation}

          center={coordinates}
          options={{ mapId: "327f00d9bd231a33" }}
          zoom={13}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
}

export default GoogleMapView;
