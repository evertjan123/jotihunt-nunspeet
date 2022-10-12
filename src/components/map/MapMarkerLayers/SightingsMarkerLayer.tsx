import { LatLng } from "leaflet";
import { FC, useEffect, useRef, useState } from "react";
import { Marker, Popup, Tooltip, useMapEvents } from "react-leaflet";
import { getAllSightings } from "../../../API";
import { Sighting } from "../../../types";
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

  const [newSighting, setNewSighting] = useState<LatLng>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const sightings = await getAllSightings();
    setSighting(sightings);
  };

  const map = useMapEvents({
    click(e) {
      const newMarker = e.latlng;
      setNewSighting(newMarker);
    },
  });

  return (
    <>
      {newSighting && (
        <Marker position={newSighting} draggable={false}>
          <Tooltip permanent interactive className="absolute z-999">
            <div className="flex flex-col text-center cursor-pointer z-99999">
              <div>Spot een vos!</div>
              <a
                href={`./?isModalOpen=true&lat=${newSighting.lat}&long=${newSighting.lng}`}
              >
                <button className="text-white bg-joti font-medium rounded-lg text-sm px-5 py-2.5 mt-2 text-center">
                  Klik hier
                </button>
              </a>
            </div>
          </Tooltip>
        </Marker>
      )}
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
