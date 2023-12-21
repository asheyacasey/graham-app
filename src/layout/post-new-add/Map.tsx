import React, { useCallback, useMemo, useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { CreateAddFormActionsType } from "@/hooks/useCreateAddForm";

const center = {
  lat: -3.745,
  lng: -38.523,
};
interface MapWithLocationOnlyProps extends CreateAddFormActionsType { }
function MapWithLocationOnly(props: MapWithLocationOnlyProps) {
  const { setValues } = props
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBL300TPzhxv63yaCPhsSfxjwtFkdT2u_E",
  });

  const [map, setMap] = React.useState(null);
  // @ts-ignore
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);
  // @ts-ignore
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const handleMapClicked = useCallback((location: google.maps.MapMouseEvent) => {
    if (!location.latLng?.lat || !location.latLng.lng) {
      return;
    }
    console.log(location)
    setValues((prev) => ({ ...prev, location: { ...prev.location, lat: Number(location.latLng?.lat()), long: Number(location.latLng?.lng()) } }))
  }, [setValues])
  const markerLocation = useMemo(() => ({
    lat: props.values.location.lat,
    lng: props.values.location.long
  }), [props.values.location.lat, props.values.location.long])
  return isLoaded ? (
    <GoogleMap
      onClick={handleMapClicked}
      mapContainerStyle={{
        width: "100%",
        height: "100%",
        borderRadius: "8px",
      }}
      center={markerLocation}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {
        props.values.location.lat && props.values.location.long &&
        <MarkerF position={markerLocation} />
      }
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapWithLocationOnly);
