import { FC, useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { getAllHunters } from "../../../API";
import { Hunter } from "../../../types";
import { carMarker } from "../MapIcons";

export const HunterMarkerLayer: FC = () => {
  const [hunters, setHunters] = useState<Hunter[]>([]);

  useEffect(() => {
    getData();
  }, []);

  let MINUTE_MS = 20000;

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, MINUTE_MS);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const getData = async () => {
    const hunters = await getAllHunters();
    console.log(hunters);
    setHunters(hunters);
  };

  return (
    <>
      {hunters.map((hunter) => {
        let marker = carMarker;
        if (hunter.location_send_at && hunter.is_hunting) {
          return (
              <Marker icon={marker} position={[hunter.lat || 0, hunter.long || 0]}>
                <Popup>
                  <div className="flex flex-col text-center">
                    <div className="pb-2">
                      <strong>{hunter.driver}</strong>
                      <div>
                        {hunter.location_send_at
                            ? `Laatst locatie geupdate ${hunter.location_send_at}`
                            : "Geen locatie informatie beschikbaar"}{" "}
                      </div>
                      <hr className="m-2"/>
                      <div>Hunt momenteel in {hunter.area?.name}</div>
                    </div>
                  </div>
                </Popup>
              </Marker>
          );
        }
      })}
    </>
  );
};
