"use client"
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const GoogleMapView = () => {
  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  const center = {
    lat: 37.7749, // Default latitude (San Francisco)
    lng: -122.4194, // Default longitude (San Francisco)
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} />
    </LoadScript>
    
  );
};

export default GoogleMapView;
