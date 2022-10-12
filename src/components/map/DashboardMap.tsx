import { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { UserLocation } from "../../types";
import { currentLocationMarker } from "./MapIcons";
import { ClubHouseMarkerLayer } from "./MapMarkerLayers/ClubHouseMarkerLayer";
import { SightingMarkerLayer } from "./MapMarkerLayers/SightingsMarkerLayer";

interface IDashboardMapProps {
  currentLocation?: UserLocation;
}

export const DashboardMap: FC<IDashboardMapProps> = (
  props: IDashboardMapProps
) => {
  return (
    <div className="sm:w-[1000px] sm:h-[1000px] h-[94vh] w-screen p-2 m-auto">
      <MapContainer
        center={[52.131527702721186, 5.849377035198454]}
        zoom={10}
        scrollWheelZoom={false}
        className=""
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.currentLocation && (
          <Marker
            icon={currentLocationMarker}
            position={[props.currentLocation?.lat, props.currentLocation?.long]}
          >
            <Popup>
              <div className="flex flex-col text-center">
                <strong>Dit ben jij</strong>
                <div>
                  Lat: {props.currentLocation.lat.toFixed(4)}, Long:{" "}
                  {props.currentLocation.long.toFixed(4)}
                </div>
                <div>
                  Nauwkeuringheid: {props.currentLocation.accuracy.toFixed(2)}
                </div>
              </div>
            </Popup>
          </Marker>
        )}
        <ClubHouseMarkerLayer />
        <SightingMarkerLayer />
      </MapContainer>
    </div>
  );
};
