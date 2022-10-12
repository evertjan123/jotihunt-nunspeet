import { FC, useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { getClubhouses } from "../../../API";
import { Clubhouse } from "../../../types";

export const ClubHouseMarkerLayer: FC = () => {
  const [clubhouses, setClubhouses] = useState<Clubhouse[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const clubhouses = await getClubhouses();
    setClubhouses(clubhouses);
  };

  return (
    <>
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
    </>
  );
};
