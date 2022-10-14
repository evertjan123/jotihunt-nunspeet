import { FC, FormEventHandler, useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { getAreas, postSighting } from "../../API";
import { Area, UserLocation } from "../../types";

interface ISetSigtingModalProps {
  isOpen: boolean;
  onClose: (arg0?: any) => any;
  manualInput: boolean;
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
      setCurrentLocation(undefined);
      console.log(currentLocation);
    } else {
      setCurrentLocation(
        JSON.parse(localStorage.getItem("currentLocation")!) || []
      );
    }
    console.log(props.manualInput)
    if(props.manualInput){
      setCurrentLocation(undefined);
      (document.getElementById("long") as HTMLInputElement).value = "";
      (document.getElementById("lat") as HTMLInputElement).value = "";

    }
  }, [props.manualInput]);

  const getData = async () => {
    const areas = await getAreas();
    setAreas(areas);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
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
        (document.getElementById("long") as HTMLInputElement).value = "";
        (document.getElementById("lat") as HTMLInputElement).value = "";
        (document.getElementById("description") as HTMLInputElement).value = "";
        (document.getElementById("optional_name") as HTMLInputElement).value = "";
        (document.getElementById("area") as HTMLInputElement).value = "-1";

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
            onClick={() => {
              props.onClose();
              navigate("./");
            }}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
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
          <div className="py-6 px-6  lg:px-8">
            <h3 className="mb-4 text-xl font-medium">Vos gespot?</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  {props.manualInput
                    ? "Vul hier je coordinaten in"
                    : urlLocation
                    ? "Geslecteerde coordinaten"
                    : "Je live locatie"}
                </label>
                <label className="block mb-2 text-sm font-medium">Lat</label>
                <input
                  type="number" 
                  step="0.00000000001"                    
                  name="lat"
                  id="lat"
                  className="border mb-2 text-inherit text-sm rounded-lg block w-full p-2.5"
                  value={
                    (currentLocation && currentLocation.lat) ||
                    (urlLocation && urlLocation.lat)
                  }
                  disabled={
                    props.manualInput
                      ? false
                      : (currentLocation || urlLocation) && true
                  }
                  required
                />
                <label className="block mb-2 text-sm font-medium">long</label>
                <input
                  type="number" 
                  step="0.00000000001"                   
                  name="long"
                  id="long"
                  className="border text-inherit text-sm rounded-lg block w-full p-2.5"
                  value={
                    (currentLocation && currentLocation.long) ||
                    (urlLocation && urlLocation.long)
                  }
                  disabled={
                    props.manualInput
                      ? false
                      : (currentLocation || urlLocation) && true
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Gebied</label>
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
                  placeholder="Bijv. HQ"
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
