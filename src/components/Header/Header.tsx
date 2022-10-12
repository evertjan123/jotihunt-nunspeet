import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header: FC = () => {
  const today = new Date();
  const startTime = today.getHours() + ":" + today.getMinutes();
  const [time, setTime] = useState(startTime);

  const history = useNavigate();

  //Set the time
  useEffect(() => {
    const timer = setInterval(() => {
      const today = new Date();
      const mins = ("0" + today.getMinutes()).slice(-2);
      const time = today.getHours() + ":" + mins;
      setTime(time);
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <header className="sticky top-0 bg-joti">
      <div className="p-3 lg:px-24">
        <div className="flex place-content-between text-white">
          <div className="cursor-pointer " onClick={() => history(-1)}>
            🠔
          </div>
          <strong>Jotihunt Nunspeet 2022</strong>
          <div>{time}</div>
        </div>
      </div>
    </header>
  );
};
