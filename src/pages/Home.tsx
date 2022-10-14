import { FC, useEffect, useState } from "react";
import { SetSightingModal } from "../components/Modals/SetSightingModal";

export const Home: FC = () => {
  const [isSetSightingModalOpen, setIsSetSightingModalOpen] =
    useState<boolean>(false);
  const [isManuel, setIsManual] = useState<boolean>(false);
  const queryParams = new URLSearchParams(window.location.search);
  const queryIsModalOpen = queryParams.get("isModalOpen");
  useEffect(() => {
    if (queryIsModalOpen) {
      setIsSetSightingModalOpen(true);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col m-auto w-80">
        <a
          href="./map"
          className="bg-joti text-white px-6 py-3 text-center rounded m-5"
        >
          <button>Ga naar kaart</button>
        </a>
        {!JSON.parse(localStorage.getItem("isLocationBlocked")!).isLocationBlocked && 
        <button
          className="bg-joti text-white px-6 py-3 text-center rounded m-5"
          onClick={() => {
            setIsManual(false);
            setIsSetSightingModalOpen(true);
          }}
        >
          Meld een vos via locatie
        </button>
        }
        <button
          className="bg-joti text-white px-6 py-3 text-center rounded m-5"
          onClick={() => {
            setIsManual(true);
            setIsSetSightingModalOpen(true);
          }}
        >
          Meld een vos handmatig
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
      </div>
    </>
  );
};
