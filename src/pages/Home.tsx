import { FC, useEffect, useState } from "react";
import { CreateHunterModal } from "../components/Modals/createHunterModal";
import { SetSightingModal } from "../components/Modals/SetSightingModal";
import { LoginModal } from "../components/Modals/LoginModal";
import { Area, Hunter } from "../types";
import { getAreas, updateHunterStatus } from "../API";
import {SetHuntModal} from "../components/Modals/SetHuntModal";

export const Home: FC = () => {
  const [isSetSightingModalOpen, setIsSetSightingModalOpen] =
    useState<boolean>(false);
  const [isCreateHunterModalOpen, setIsCreateHunterModalOpen] =
    useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSetHuntModalOpen, setIsSetHuntModalOpen] = useState<boolean>(false);
  const [isManuel, setIsManual] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<Hunter>();
  const [areas, setAreas] = useState<Area[]>([]);

  const queryParams = new URLSearchParams(window.location.search);
  const queryIsModalOpen = queryParams.get("isModalOpen");

  const ReRenderUser = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!(Object.keys(user).length === 0)) {
      setLoggedInUser(user);
    }
  };
  const getData = async () => {
    const areas = await getAreas();
    setAreas(areas);
  };

  const updateStatus = async () => {
    if (loggedInUser && loggedInUser.id) {
      const hunter = await updateHunterStatus(
        loggedInUser.id,
        !loggedInUser.is_hunting
      );
      localStorage.setItem("user", JSON.stringify(hunter.data));
      ReRenderUser();
    }
  };

  const updateArea = async (area_id: number) => {
    if (loggedInUser && loggedInUser.id) {
      const hunter = await updateHunterStatus(
        loggedInUser.id,
        loggedInUser.is_hunting,
        area_id
      );
      localStorage.setItem("user", JSON.stringify(hunter.data));
      ReRenderUser();
    }
  };

  useEffect(() => {
    getData();
    if (queryIsModalOpen) {
      setIsSetSightingModalOpen(true);
    }
    ReRenderUser();
  }, [isLoginModalOpen]);

  return (
    <>
      <div className="flex flex-col m-auto w-80">
        <h1 className="text-lg text-center m-5">
          Welkom {loggedInUser?.driver}
        </h1>
        <h1 className="text-lg text-center m-2">Huidige locatie:</h1>
        <h1 className="text-center">
          Lat: {loggedInUser?.lat} Long: {loggedInUser?.long}
        </h1>
        <a
          href="./map"
          className="bg-joti text-white px-6 py-3 text-center rounded m-5"
        >
          <button>Ga naar kaart</button>
        </a>
        {loggedInUser ? (
          <>
            {localStorage.getItem("isLocationBlocked") !== null &&
              !JSON.parse(localStorage.getItem("isLocationBlocked")!)
                .isLocationBlocked && (
                <>
                  <button
                    className="bg-joti text-white px-6 py-3 text-center rounded m-5"
                    onClick={() => {
                      setIsManual(false);
                      setIsSetSightingModalOpen(true);
                    }}
                  >
                    Meld een vos via locatie
                  </button>
                  <button
                    className="bg-joti text-white px-6 py-3 text-center rounded m-5"
                    onClick={() => {
                      setIsManual(true);
                      setIsSetSightingModalOpen(true);
                    }}
                  >
                    Meld een vos handmatig
                  </button>
                </>
              )}
            <button
                className="bg-joti text-white px-6 py-3 text-center rounded m-5"
                onClick={() => {
                  setIsSetHuntModalOpen(true);
                }}
            >
              Geef hunt door
            </button>
            <button
              className="bg-joti text-white px-6 py-3 text-center rounded m-5"
              onClick={() => {
                updateStatus();
              }}
            >
              Hunter momenteel:
              {loggedInUser.is_hunting ? "  actief" : "  inactief"}
            </button>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Je hunt momenteel in:
              </label>
              <select
                id="area"
                className="border text-sm rounded-lg block w-full p-2.5"
                onChange={(e) => updateArea(parseInt(e.target.value))}
              >
                {areas.map((area) => {
                  return (
                    <option
                      selected={area.id === loggedInUser.area_id}
                      value={area.id}
                    >
                      {area.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </>
        ) : (
          <button
            className="bg-joti text-white px-6 py-3 text-center rounded m-5"
            onClick={() => {
              setIsCreateHunterModalOpen(true);
            }}
          >
            Meld hunter aan
          </button>
        )}
        <button
          className="bg-joti text-white px-6 py-3 text-center rounded m-5"
          onClick={() => {
            if (loggedInUser) {
              localStorage.removeItem("user");
              localStorage.removeItem("userToken");
              setLoggedInUser(undefined);
            } else {
              setIsLoginModalOpen(true);
            }
          }}
        >
          {loggedInUser ? "Uitloggen hunter" : "Inloggen hunter"}
        </button>
        {/* <a
          href="./map"
          className="bg-joti text-white px-6 py-3 text-center rounded m-5"
        >
          <button>Lezen</button>
        </a>{" "} */}
      </div>
      <div className="flex justify-center">
        <SetSightingModal
          isOpen={isSetSightingModalOpen}
          onClose={() => setIsSetSightingModalOpen(false)}
          manualInput={isManuel}
        />
        <CreateHunterModal
          isOpen={isCreateHunterModalOpen}
          onClose={() => setIsCreateHunterModalOpen(false)}
        />
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
        <SetHuntModal
            isOpen={isSetHuntModalOpen}
            onClose={() => setIsSetHuntModalOpen(false)}
        />
      </div>
    </>
  );
};
