import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {downloadImage, loginHunter} from "../../API";
import { UserLocation } from "../../types";

interface IDownloadConfirmModalProps {
  isOpen: boolean;
  onClose: (arg0?: any) => any;
  huntID: number
}

export const DownloadConfirmModal: FC<IDownloadConfirmModalProps> = (props: IDownloadConfirmModalProps) => {
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
    if (event.target.key.value ) {
      downloadImage(props.huntID, event.target.key.value).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'downloaded_file.png');
        document.body.appendChild(link);
        link.click();
      });
    } else {
      setError("Vul alles in");
    }
  };

  return (
    <div
      className={`${
        props.isOpen ? "absolute" : "hidden"
      } left-0 top-0 right-0 mb-screen overflow-hidden bg-[#AAAAAA80] z-1 bottom-0 h-full h-screen w-full`}
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
            <h3 className="mb-4 text-xl font-medium">Downloaden foto</h3>
            <h2>Voer de geheime sleutel in:</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium">Sleutel</label>
                <input
                  type="password"
                  name="key"
                  id="key"
                  className="border text-joti text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              <div className="text-center font-bold	text-joti">{error}</div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-3/5 text-white bg-joti font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Download
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
