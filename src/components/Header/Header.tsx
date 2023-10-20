import { FC, useState } from "react";

export const Header: FC = () => {
  const today = new Date();
  const startTime = today.getHours() + ":" + today.getMinutes();
  const [time, setTime] = useState(startTime);

  //Set the time
  const updateClock = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    const timeString = `${hours}:${minutes}:${seconds}`;

    setTime(timeString);
  };

  setInterval(updateClock, 1000);

  return (
    <header className="sticky top-0 bg-joti">
      <div className="p-3 lg:px-24">
        <div className="flex place-content-between text-white">
          <a className="cursor-pointer text-xl items-center" href="/">
            {"<-"}
          </a>
          <strong>Jotihunt Nunspeet 2023</strong>
          <div>{time}</div>
        </div>
      </div>
    </header>
  );
};
