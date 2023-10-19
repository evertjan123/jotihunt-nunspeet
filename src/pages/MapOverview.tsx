import { FC, useEffect, useState } from "react";
import { ArticleList } from "../components/ArticleList/ArticleList";
import { DashboardMap } from "../components/map/DashboardMap";
import { SetSightingModal } from "../components/Modals/SetSightingModal";
import { UserLocation } from "../types";
import {HunterOverview} from "../components/HunterOverview/HunterOverview";
import {AreasOverview} from "../components/AreasOverview/AreasOverview";
import {HuntsOverview} from "../components/HuntsOverview/HuntsOverview";

export const MapOverview: FC = () => {
  return (
    <div className="text-center">
      <strong className="text-xl m-5">Kaart jotihunt</strong>
      <div className="flex flex-col-reverse lg:flex-row justify-stretch max-h-screen">
          <HunterOverview />
          <DashboardMap />
          <HuntsOverview />
      </div>
        <AreasOverview />
    </div>
  );
};
