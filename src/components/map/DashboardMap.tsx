import { FC, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { getAllSightings, getClubhouses } from "../../API";
import { Clubhouse, UserLocation } from "../../types";
import { currentLocationMarker, sightingMarker } from "./MapIcons";

interface IDashboardMapProps {
  currentLocation?: UserLocation;
}

export const DashboardMap: FC<IDashboardMapProps> = (
  props: IDashboardMapProps
) => {
  const [clubhouses, setClubhouses] = useState<Clubhouse[]>([]);
  const [sighting, setSighting] = useState<Clubhouse[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const clubhouses = await getClubhouses();
    setClubhouses(clubhouses);

    const sightings = await getAllSightings();
    console.log(sighting);
    setSighting(sightings);
  };

  return (
    <div className="sm:w-[1000px] sm:h-[1000px] h-96 w-96 m-auto">
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
                  Lat: {props.currentLocation.lat.toFixed(2)}, Long:{" "}
                  {props.currentLocation.long.toFixed(2)}
                </div>
                <div>
                  Nauwkeuringheid: {props.currentLocation.accuracy.toFixed(2)}
                </div>
              </div>
            </Popup>
          </Marker>
        )}
        {clubhouses.map((home) => {
          return (
            <Marker position={[home.lat, home.long]}>
              <Popup>
                <div className="flex flex-col text-center">
                  <strong>{home.name}</strong>
                  <div>
                    {home.street} {home.housenumber}
                    {home.housenumber_addition && home.housenumber_addition}
                  </div>
                  <div>
                    {home.postcode} {home.city}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {sighting.map((sighting) => {
          return (
            <Marker
              icon={sightingMarker}
              position={[sighting.lat, sighting.long]}
            >
              <Popup>
                <div className="flex flex-col text-center">
                  <strong>Vos gespot</strong>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
