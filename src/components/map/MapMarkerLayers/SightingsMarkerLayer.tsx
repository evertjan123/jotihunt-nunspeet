import { FC, useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { getAllSightings } from "../../../API";
import { Clubhouse, Sighting } from "../../../types";
import {
  alphaSightingMarker,
  betaSightingMarker,
  charlieSightingMarker,
  deltaSightingMarker,
  echoSightingMarker,
  foxtrotSightingMarker,
} from "../MapIcons";

interface ISightingMarkerLayerProps {
  filters: number[];
}

export const SightingMarkerLayer: FC<ISightingMarkerLayerProps> = (
  props: ISightingMarkerLayerProps
) => {
  const [sighting, setSighting] = useState<Sighting[]>([]);

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
        if (props.filters.includes(sighting.area_id)) {
          let marker;

          switch (sighting.area_id) {
            case 1:
              marker = alphaSightingMarker;
              break;
            case 2:
              marker = betaSightingMarker;
              break;
            case 3:
              marker = charlieSightingMarker;
              break;
            case 4:
              marker = deltaSightingMarker;
              break;
            case 5:
              marker = echoSightingMarker;
              break;
            case 6:
              marker = foxtrotSightingMarker;
              break;
          }

          return (
            <Marker icon={marker} position={[sighting.lat, sighting.long]}>
              <Popup>
                <div className="flex flex-col text-center">
                  <strong>Vos gespot</strong>
                  <div>Gebied: {sighting.area.name}</div>
                </div>
              </Popup>
            </Marker>
          );
        }
      })}
    </>
  );
};
