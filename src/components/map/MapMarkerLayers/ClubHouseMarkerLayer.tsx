import { FC, useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { getClubhouses } from "../../../API";
import { Clubhouse } from "../../../types";
import {
  alphaClubhouseMarker,
  alphaSightingMarker,
  betaClubhouseMarker,
  betaSightingMarker,
  charlieClubhouseMarker,
  charlieSightingMarker,
  clubhouseSightingMarker,
  deltaClubhouseMarker,
  deltaSightingMarker,
  echoClubhouseMarker,
  echoSightingMarker,
  foxtrotClubhouseMarker,
  foxtrotSightingMarker,
} from "../MapIcons";

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
        let marker = betaSightingMarker;
        switch (home.area) {
          case "Alpha":
            marker = alphaClubhouseMarker;
            break;
          case "Bravo":
            marker = betaClubhouseMarker;
            break;
          case "Charlie":
            marker = charlieClubhouseMarker;
            break;
          case "Delta":
            marker = deltaClubhouseMarker;
            break;
          case "Echo":
            marker = echoClubhouseMarker;
            break;
          case "Foxtrot":
            marker = foxtrotClubhouseMarker;
            break;
        }
        return (
          <Marker icon={marker} position={[home.lat, home.long]}>
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
                <div>Gebied: {home.area.toLocaleLowerCase()}</div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};
