import { FC, useEffect, useState } from "react";
import { ArticleList } from "../components/ArticleList/ArticleList";
import { DashboardMap } from "../components/map/DashboardMap";
import { SetSightingModal } from "../components/Modals/SetSightingModal";
import { UserLocation } from "../types";

export const Dashboard: FC = () => {
  const [currentLocation, setCurrentLocation] = useState<
    UserLocation | undefined
  >();
  const [isSetSightingModalOpen, setIsSetSightingModalOpen] =
    useState<boolean>(false);

  const MINUTE_MS = 60000;

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getLocation();
    }, MINUTE_MS);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <h1>Dashboard overview</h1>
      <div className="flex justify-center">
        <ArticleList />
        <div>
          <DashboardMap currentLocation={currentLocation} />
          <button
            className="bg-blue px-6 py-3 rounded m-5"
            onClick={() => setIsSetSightingModalOpen(true)}
          >
            Submit sighting
          </button>
        </div>
        <div></div>
      </div>

      <SetSightingModal
        isOpen={isSetSightingModalOpen}
        onClose={() => setIsSetSightingModalOpen(false)}
        location={currentLocation}
      />
    </>
  );
};
