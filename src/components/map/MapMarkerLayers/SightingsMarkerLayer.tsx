import { FC, useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { getAllSightings } from "../../../API";
import { Clubhouse } from "../../../types";
import { sightingMarker } from "../MapIcons";

export const SightingMarkerLayer: FC = () => {
  const [sighting, setSighting] = useState<Clubhouse[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const sightings = await getAllSightings();
    setSighting(sightings);
  };

  return (
    <>
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
    </>
  );
};
