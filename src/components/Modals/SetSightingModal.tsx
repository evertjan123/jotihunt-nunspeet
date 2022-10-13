import { FC, FormEventHandler, useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { getAreas, postSighting } from "../../API";
import { Area, UserLocation } from "../../types";

interface ISetSigtingModalProps {
  isOpen: boolean;
  onClose: (arg0?: any) => any;
}

export const SetSightingModal: FC<ISetSigtingModalProps> = (
  props: ISetSigtingModalProps
) => {
  const [error, setError] = useState<string>("");
  const [areas, setAreas] = useState<Area[]>([]);
  const [currentLocation, setCurrentLocation] = useState<
    UserLocation | undefined
  >();
  const [urlLocation, setUrlLocation] = useState<UserLocation | undefined>();

  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const urlLat = queryParams.get("lat");
  const urlLong = queryParams.get("long");

  useEffect(() => {
    if (props.isOpen) {
      window.scrollTo(50, 0);
      window.onscroll = function () {
        window.scrollTo(50, 0);
      };
    } else {
      window.onscroll = function () {};
    }
  }, [props.isOpen]);

  useEffect(() => {
    getData();
    if (urlLat && urlLong) {
      setUrlLocation({
        lat: Number(urlLat),
        long: Number(urlLong),
        accuracy: 0,
      });
    }
  }, []);

  // sync storage and state
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocation(
        JSON.parse(localStorage.getItem("currentLocation")!) || []
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getData = async () => {
    const areas = await getAreas();
    setAreas(areas);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(event.target.area.value);
    // check if values are filled
    if (event.target.lat.value && event.target.long.value) {
      if (event.target.area.value !== "-1") {
        setError("");
        // create sighting
        const response = await postSighting({
          description: event.target.description.value ?? null,
          lat: event.target.lat.value,
          long: event.target.long.value,
          optional_name: event.target.optional_name.value ?? null,
          hunter_id: null,
          area_id: event.target.area.value,
        });
        if (urlLat && urlLong) {
          navigate("./map");
        }

        props.onClose();
      } else {
        setError("Kies een gebied");
      }
    }
  };

  return (
    <div
      className={`${
        props.isOpen ? "absolute" : "hidden"
      } left-0 top-0 right-0 mb-screen overflow-hidden bg-[#AAAAAA80] bottom-0 h-full h-screen w-full`}
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto flex flex-col bg-bg_main m-auto py-5 px-5 rounded">
        <div className="relative rounded-lg  !z-40 shadow bg-gray">
          <div
            className="absolute top-3 right-2.5  bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center cursor-pointer"
            onClick={() => props.onClose()}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </div>
          <div className="py-6 px-6  lg:px-8">
            <h3 className="mb-4 text-xl font-medium">Vos gespot?</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  {urlLocation
                    ? "Jouwn geslecteerde coordinaten"
                    : "jouwn live locatie"}
                </label>
                <label>Lat</label>
                <input
                  type="input"
                  name="lat"
                  id="lat"
                  className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  value={
                    (urlLocation?.lat && urlLocation.lat) ||
                    (currentLocation && currentLocation.lat)
                  }
                  disabled={(currentLocation || urlLocation) && true}
                />
                <label>long</label>
                <input
                  type="input"
                  name="long"
                  id="long"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  value={
                    (urlLocation?.long && urlLocation.long) ||
                    (currentLocation && currentLocation.long)
                  }
                  disabled={(currentLocation || urlLocation) && true}
                />
              </div>

              <div>
                <label htmlFor="" className="block mb-2 text-sm font-medium">
                  Gebied
                </label>
                <select
                  id="area"
                  className="border text-sm rounded-lg block w-full p-2.5"
                >
                  <option selected value={-1}>
                    Kies een gebied
                  </option>
                  {areas.map((area) => {
                    return <option value={area.id}>{area.name}</option>;
                  })}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Korte beschrijving (Optioneel)
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  className="border pb-5 text-sm rounded-lg block w-full p-2.5"
                />
              </div>

              <div>
                <label
                  htmlFor=""
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Naam melder (Optioneel)
                </label>
                <input
                  type="input"
                  name="optional_name"
                  id="optional_name"
                  className="border  text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              <div className="text-center font-bold	text-joti">{error}</div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-3/5 text-white bg-joti font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Geef vos aan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
