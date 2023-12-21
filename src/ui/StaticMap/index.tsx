import React, { useCallback, useMemo, useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { CreateAddFormActionsType } from "@/hooks/useCreateAddForm";

const containerStyle = {
    width: "100%",
    height: "100%",
};
interface StaticMapProps {
    center: google.maps.LatLng | google.maps.LatLngLiteral | undefined
}
function StaticMap({ center }: StaticMapProps) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // @ts-ignore
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{
                width: "100%",
                height: "100%",
                borderRadius: "8px",
            }}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {
                center ?
                    <MarkerF position={center} />
                    :
                    null
            }
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(StaticMap);
