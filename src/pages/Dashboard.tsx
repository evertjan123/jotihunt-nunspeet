import { FC, useEffect, useState } from "react";
import { ArticleList } from "../components/ArticleList/ArticleList";
import { DashboardMap } from "../components/map/DashboardMap";
import { SetSightingModal } from "../components/Modals/SetSightingModal";
import { UserLocation } from "../types";

export const Dashboard: FC = () => {
  return (
    <>
      <h1>Dashboard overview</h1>
      <div className="flex flex-col md:flex-row justify-center">
        <div />
        <div></div>
        <div></div>
      </div>
    </>
  );
};
