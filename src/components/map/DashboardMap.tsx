import { FC, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { UserLocation } from "../../types";
import { currentLocationMarker } from "./MapIcons";
import { ClubHouseMarkerLayer } from "./MapMarkerLayers/ClubHouseMarkerLayer";
import { SightingMarkerLayer } from "./MapMarkerLayers/SightingsMarkerLayer";

export const DashboardMap: FC = () => {
  const [currentLocation, setCurrentLocation] = useState<
    UserLocation | undefined
  >();

  // sync storage and state
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocation(
        JSON.parse(localStorage.getItem("currentLocation")!) || []
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="text-center">
        <button
          className="bg-joti px-6 py-3 text-white text-center w-3/5 rounded-lg my-1"
          onClick={() => {}}
        >
          Filters
        </button>
      </div>
      <div className="sm:w-[1000px] sm:h-[1000px] h-[80vh] w-screen px-2 m-auto">
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

          {currentLocation && (
            <Marker
              icon={currentLocationMarker}
              position={[currentLocation?.lat, currentLocation?.long]}
            >
              <Popup>
                <div className="flex flex-col text-center">
                  <strong>Dit ben jij</strong>
                  <div>
                    Lat: {currentLocation.lat.toFixed(4)}, Long:{" "}
                    {currentLocation.long.toFixed(4)}
                  </div>
                  <div>
                    Nauwkeuringheid: {currentLocation.accuracy.toFixed(2)}
                  </div>
                </div>
              </Popup>
            </Marker>
          )}
          <ClubHouseMarkerLayer />
          <SightingMarkerLayer />
        </MapContainer>
      </div>
    </>
  );
};
