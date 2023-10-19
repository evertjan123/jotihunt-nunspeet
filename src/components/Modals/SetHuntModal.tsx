import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {loginHunter, postHunt} from "../../API";
import { UserLocation } from "../../types";

interface ISetHuntModal {
  isOpen: boolean;
  onClose: (arg0?: any) => any;
}

export const SetHuntModal: FC<ISetHuntModal> = (props: ISetHuntModal) => {
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (event.target.code.value) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!(Object.keys(user).length === 0)) {
        const id = user.id
        const formData = new FormData();
        console.log(event);
        formData.append('image', event.target.elements['image'].files[0]);
        formData.append('code', event.target.code.value);
        formData.append('time', event.target.time.value);
        formData.append('area_id', user.area_id);

        const data = await postHunt(formData, id);
        if (!data) {
          setError("Code aanmaken mislukt");
        } else {
          props.onClose();
        }
      }
    } else {
      setError("Vul alles in");
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
            <h3 className="mb-4 text-xl font-medium">Geef een hunt door aan HQ</h3>
            <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
              <div>
                <label className="block mb-2 text-sm font-medium">Code</label>
                <input
                  type="input"
                  name="code"
                  id="code"
                  className="border text-inherit text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Tijd</label>
                <input
                    type="input"
                    name="time"
                    id="time"
                    className="border text-inherit text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Foto</label>
                <input type="file" name="image" accept="image/*" capture="environment"/>
              </div>
              <div className="text-center font-bold	text-joti">{error}</div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-3/5 text-white bg-joti font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Code doorgeven
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
