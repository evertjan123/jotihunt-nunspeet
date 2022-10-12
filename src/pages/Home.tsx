import { FC } from "react";

export const Home: FC = () => {
  return (
    <>
      <div className="flex flex-col m-auto w-96">
        <a href="./map" className="bg-blue px-6 py-3 text-center rounded m-5">
          <button>Ga naar kaart</button>
        </a>
        <a href="./map" className="bg-blue px-6 py-3 text-center rounded m-5">
          <button>Meld een vos</button>
        </a>
        <a href="./map" className="bg-blue px-6 py-3 text-center rounded m-5">
          <button>Lezen</button>
        </a>{" "}
      </div>
    </>
  );
};
