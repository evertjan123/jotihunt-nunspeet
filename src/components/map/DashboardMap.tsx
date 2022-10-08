import { FC, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { getClubhouses } from "../../API";
import { Clubhouse } from "../../types";

export const DashboardMap: FC = () => {
  const [clubhouses, setClubhouses] = useState<Clubhouse[] | []>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const clubhouses = await getClubhouses();
    setClubhouses(clubhouses);
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
        {clubhouses.map((home) => {
          return (
            <Marker position={[home.lat, home.long]}>
              <Popup>
                <div className="flex">
                  <div>{home.name}</div>
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
      </MapContainer>
    </div>
  );
};
