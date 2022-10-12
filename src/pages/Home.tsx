import { FC, useEffect, useState } from "react";
import { SetSightingModal } from "../components/Modals/SetSightingModal";

export const Home: FC = () => {
  const [isSetSightingModalOpen, setIsSetSightingModalOpen] =
    useState<boolean>(false);

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
        />
      </div>
    </>
  );
};
