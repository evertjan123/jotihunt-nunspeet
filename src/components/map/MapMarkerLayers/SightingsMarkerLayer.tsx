import { LatLng } from "leaflet";
import { FC, useEffect, useRef, useState } from "react";
import { Marker, Polyline, Popup, Tooltip, useMapEvents } from "react-leaflet";
import { deleteSighting, getAllSightings } from "../../../API";
import { Sighting } from "../../../types";
import {
  alphaSightingMarker,
  betaSightingMarker,
  charlieSightingMarker,
  deltaSightingMarker,
  echoSightingMarker,
  foxtrotSightingMarker,
} from "../MapIcons";
import { SightingsPolylineLayer } from "./SightingsPolylineLayer";

interface ISightingMarkerLayerProps {
  filters: number[];
}

export const SightingMarkerLayer: FC<ISightingMarkerLayerProps> = (
  props: ISightingMarkerLayerProps
) => {
  const [sighting, setSighting] = useState<Sighting[]>([]);

  const [newSighting, setNewSighting] = useState<LatLng>();

  const [closeTooltip, setCloseTooltip] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  let MINUTE_MS = 8000;

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, MINUTE_MS);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const getData = async () => {
    const sightings = await getAllSightings();
    setSighting(sightings);
  };

  const map = useMapEvents({
    click(e) {
      if (!newSighting) {
        const newMarker = e.latlng;
        setNewSighting(newMarker);
      }
      if (closeTooltip) {
        setNewSighting(undefined);
        setCloseTooltip(false);
      }
    },
  });

  return (
    <>
      {newSighting && (
        <Marker position={newSighting} draggable={false}>
          <Tooltip permanent interactive className="absolute">
            <div className="flex flex-row text-center cursor-pointer z-99999">
              <div className="flex flex-col">
                <div className="pt-1.5 px-7">Spot een vos!</div>

                <a
                  href={`./?isModalOpen=true&lat=${newSighting.lat}&long=${newSighting.lng}`}
                >
                  <button className="text-white bg-joti font-medium rounded-lg text-sm px-5 py-2.5 mt-2 text-center">
                    Klik hier
                  </button>
                </a>
              </div>
              <div
                className="top-3 right-2.5  bg-transparent rounded-lg text-sm p-1.5 cursor-pointer"
                onClick={() => {
                  setCloseTooltip(true);
                }}
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </div>
            </div>
          </Tooltip>
        </Marker>
      )}
      <SightingsPolylineLayer sightings={sighting} filters={props.filters} />;
      {sighting.map((sight) => {
        if (props.filters.includes(sight.area_id)) {
          let marker;
          switch (sight.area_id) {
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
            <Marker icon={marker} position={[sight.lat, sight.long]}>
              <Popup>
                <div className="flex flex-col text-center">
                  <strong className="text-lg pb-2">Vos gespot</strong>
                  <div>Gebied: {sight.area.name}</div>
                  <div className="pb-2">
                    Gespot op: {new Date(sight.created_at).toLocaleString()}
                  </div>
                  {(sight.description || sight.optional_name) && (
                    <>
                      <hr />
                      <div className="pt-2">{sight.description} </div>
                      <div className="py-2">
                        {sight.optional_name
                          ? "Gespot door " + sight.optional_name
                          : ""}
                      </div>
                    </>
                  )}
                  <hr />
                  <div className="py-2">
                    lat: {sight.lat.toString().slice(0, 7)} long:{" "}
                    {sight.long.toString().slice(0, 7)}
                  </div>
                  <button
                    className="text-white bg-joti font-medium rounded-lg text-sm px-5 py-2.5 mt-2 text-center"
                    onClick={() => {
                      deleteSighting(sight.id);
                      setSighting(
                        sighting.filter((e) => {
                          return e.id !== sight.id;
                        })
                      );
                    }}
                  >
                    Verwijder marker
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        }
      })}
    </>
  );
};
