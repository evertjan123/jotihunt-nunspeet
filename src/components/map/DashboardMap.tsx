import { FC, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { UserLocation } from "../../types";
import { currentLocationMarker } from "./MapIcons";
import { ClubHouseMarkerLayer } from "./MapMarkerLayers/ClubHouseMarkerLayer";
import { SightingMarkerLayer } from "./MapMarkerLayers/SightingsMarkerLayer";
import { HunterMarkerLayer } from "./MapMarkerLayers/HunterMarkerLayer";

export const DashboardMap: FC = () => {
  const [currentLocation, setCurrentLocation] = useState<
    UserLocation | undefined
  >();
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const [showClubHouses, setShowClubHouses] = useState<boolean>(true);
  const [selectedAreas, setSelectedAreas] = useState<number[]>([
    1, 2, 3, 4, 5, 6,
  ]);

  // sync storage and state
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocation(
        JSON.parse(localStorage.getItem("currentLocation")!) || []
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="text-center">
        <button
          className="bg-joti px-6 py-3 text-white text-center w-3/5 rounded-lg my-1"
          onClick={() => {
            setIsFilterOpen(!isFilterOpen);
          }}
        >
          {isFilterOpen ? "Sluit f" : "F"}ilters
        </button>
      </div>
      {isFilterOpen ? (
        <div className="pl-5 pt-10">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={showClubHouses}
              className="w-6 h-6 text-joti bg-joti rounded"
              onChange={() => setShowClubHouses(!showClubHouses)}
            />
            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Toon clubhuizen
            </label>
          </div>
          Selecteer je regio's:
          <div className="pl-5 pt-5">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={selectedAreas.includes(1)}
                className="w-6 h-6 text-joti bg-joti rounded"
                onChange={() => {
                  selectedAreas.includes(1)
                    ? setSelectedAreas(
                        selectedAreas.filter((area) => {
                          return area !== 1;
                        })
                      )
                    : setSelectedAreas(selectedAreas.concat([1]));
                }}
              />
              <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Alpha
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={selectedAreas.includes(2)}
                className="w-6 h-6 text-joti bg-joti rounded"
                onChange={() => {
                  selectedAreas.includes(2)
                    ? setSelectedAreas(
                        selectedAreas.filter((area) => {
                          return area !== 2;
                        })
                      )
                    : setSelectedAreas(selectedAreas.concat([2]));
                }}
              />
              <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Bravo
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={selectedAreas.includes(3)}
                className="w-6 h-6 text-joti bg-joti rounded"
                onChange={() => {
                  selectedAreas.includes(3)
                    ? setSelectedAreas(
                        selectedAreas.filter((area) => {
                          return area !== 3;
                        })
                      )
                    : setSelectedAreas(selectedAreas.concat([3]));
                }}
              />
              <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Charlie
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={selectedAreas.includes(4)}
                className="w-6 h-6 text-joti bg-joti rounded"
                onChange={() => {
                  selectedAreas.includes(4)
                    ? setSelectedAreas(
                        selectedAreas.filter((area) => {
                          return area !== 4;
                        })
                      )
                    : setSelectedAreas(selectedAreas.concat([4]));
                }}
              />
              <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Delta
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={selectedAreas.includes(5)}
                className="w-6 h-6 text-joti bg-joti rounded"
                onChange={() => {
                  selectedAreas.includes(5)
                    ? setSelectedAreas(
                        selectedAreas.filter((area) => {
                          return area !== 5;
                        })
                      )
                    : setSelectedAreas(selectedAreas.concat([5]));
                }}
              />
              <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Echo
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={selectedAreas.includes(6)}
                className="w-6 h-6 text-joti bg-joti rounded"
                onChange={() => {
                  selectedAreas.includes(6)
                    ? setSelectedAreas(
                        selectedAreas.filter((area) => {
                          return area !== 6;
                        })
                      )
                    : setSelectedAreas(selectedAreas.concat([6]));
                }}
              />
              <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Foxtrot
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="sm:w-[150vh] sm:h-[85vh] h-[75vh] w-screen px-2 m-auto">
          <MapContainer
            center={[52.131527702721186, 5.849377035198454]}
            zoom={10}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {currentLocation && (
              <Marker
                icon={currentLocationMarker}
                position={[currentLocation?.lat, currentLocation?.long]}
              >
                <Popup>
                  <div className="flex flex-col text-center">
                    <strong>Dit ben jij</strong>
                    <div>
                      Lat: {currentLocation && currentLocation.lat.toFixed(4)},
                      Long: {currentLocation && currentLocation.long.toFixed(4)}
                    </div>
                    <div>
                      Nauwkeuringheid: {currentLocation.accuracy.toFixed(2)}
                    </div>
                  </div>
                </Popup>
              </Marker>
            )}
            {showClubHouses && <ClubHouseMarkerLayer />}
            <HunterMarkerLayer />
            <SightingMarkerLayer filters={selectedAreas} />
          </MapContainer>
        </div>
      )}
    </>
  );
};
