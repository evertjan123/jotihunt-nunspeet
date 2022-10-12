import { FC, useState } from "react";
import { SetSightingModal } from "../components/Modals/SetSightingModal";

export const Home: FC = () => {
  const [isSetSightingModalOpen, setIsSetSightingModalOpen] =
    useState<boolean>(false);
  return (
    <>
      <div className="flex flex-col m-auto w-80">
        <a href="./map" className="bg-blue px-6 py-3 text-center rounded m-5">
          <button>Ga naar kaart</button>
        </a>
        <button
          className="bg-blue px-6 py-3 text-center rounded m-5"
          onClick={() => {
            setIsSetSightingModalOpen(true);
          }}
        >
          Meld een vos
        </button>
        <a href="./map" className="bg-blue px-6 py-3 text-center rounded m-5">
          <button>Lezen</button>
        </a>{" "}
      </div>
      <div className="flex justify-center">
        <SetSightingModal
          isOpen={isSetSightingModalOpen}
          onClose={() => setIsSetSightingModalOpen(false)}
          location={JSON.parse(sessionStorage.getItem("currentLocation")!)}
        />
      </div>
    </>
  );
};
