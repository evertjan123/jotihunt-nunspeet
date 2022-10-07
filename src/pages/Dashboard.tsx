import { FC } from "react";
import { DashboardMap } from "../components/map/DashboardMap";

export const Dashboard: FC = () => {
  return (
    <>
      <h1>Dashboard overview</h1>
      <DashboardMap />
    </>
  );
};
