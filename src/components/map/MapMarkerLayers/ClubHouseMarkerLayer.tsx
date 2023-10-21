import React, { FC, useEffect, useState } from "react";
import {Circle, Marker, Popup} from "react-leaflet";
import { getClubhouses } from "../../../API";
import { Clubhouse } from "../../../types";
import {
  alphaClubhouseMarker,
  betaClubhouseMarker,
  betaSightingMarker,
  charlieClubhouseMarker,
  deltaClubhouseMarker,
  echoClubhouseMarker,
  foxtrotClubhouseMarker,
} from "../MapIcons";

export const ClubHouseMarkerLayer: FC = () => {
  const [clubhouses, setClubhouses] = useState<Clubhouse[]>([]);

  useEffect(() => {
    getData();
  }, []);

  let MINUTE_MS = 5000000;

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, MINUTE_MS);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const getData = async () => {
    const clubhouses = await getClubhouses();
    setClubhouses(clubhouses);
  };

  return (
    <>
      {clubhouses.map((home) => {
        let marker = betaSightingMarker;
        let circle;
        switch (home.area) {
          case "Alpha":
            marker = alphaClubhouseMarker;
            circle = "green";
            break;
          case "Bravo":
            marker = betaClubhouseMarker;
            circle = "purple";
            break;
          case "Charlie":
            marker = charlieClubhouseMarker;
            circle = "orange";
            break;
          case "Delta":
            marker = deltaClubhouseMarker;
            circle = "yellow";
            break;
          case "Echo":
            marker = echoClubhouseMarker;
            circle = "purple";
            break;
          case "Foxtrot":
            marker = foxtrotClubhouseMarker;
            circle = "blue";
            break;
        }
        return (
            <>
              <Circle center={[home.lat, home.long]} radius={450} color={circle} />
          <Marker icon={marker} position={[home.lat, home.long]}>
            <Popup>
              <div className="flex flex-col text-center">
                <div className="pb-2">
                  <strong>{home.name}</strong>
                  <div>
                    {home.street} {home.housenumber}
                    {home.housenumber_addition && home.housenumber_addition}
                  </div>
                  <div>
                    {home.postcode} {home.city}
                  </div>
                </div>
                <hr />
                <div className="pt-2">
                  <div>Gebied: {home.area.toLocaleLowerCase()}</div>
                  <div>
                    Punten voor foto opdrachten:
                    {home.photo_assignment_points
                      ? home.photo_assignment_points
                      : 0}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
            </>
        );
      })}
    </>
  );
};
