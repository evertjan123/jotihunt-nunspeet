import { FC } from "react";
import { Polyline } from "react-leaflet";
import { Sighting } from "../../../types";

interface ISightingsPolylineLayerProps {
  sightings: Sighting[];
  filters: number[];
}

export const SightingsPolylineLayer: FC<ISightingsPolylineLayerProps> = (
  props: ISightingsPolylineLayerProps
) => {
  const AlphaPolyline: any = [];
  const BetaPolyline: any = [];
  const CharliePolyline: any = [];
  const DeltaPolyline: any = [];
  const EchoPolyline: any = [];
  const FoxtrotPolyline: any = [];

  props.sightings.map((sighting) => {
    if (props.filters.includes(sighting.area_id)) {
      switch (sighting.area_id) {
        case 1:
          if (AlphaPolyline.length < 7) {
            AlphaPolyline.push([sighting.lat, sighting.long]);
          } else {
            AlphaPolyline.shift();
            AlphaPolyline.push([sighting.lat, sighting.long]);
          }
          break;
        case 2:
          if (BetaPolyline.length < 7) {
            BetaPolyline.push([sighting.lat, sighting.long]);
          } else {
            BetaPolyline.shift();
            BetaPolyline.push([sighting.lat, sighting.long]);
          }
          break;
        case 3:
          if (CharliePolyline.length < 7) {
            CharliePolyline.push([sighting.lat, sighting.long]);
          } else {
            BetaPolyline.shift();
            BetaPolyline.push([sighting.lat, sighting.long]);
          }
          break;
        case 4:
          if (DeltaPolyline.length < 7) {
            DeltaPolyline.push([sighting.lat, sighting.long]);
          } else {
            BetaPolyline.shift();
            BetaPolyline.push([sighting.lat, sighting.long]);
          }
          break;
        case 5:
          if (EchoPolyline.length < 7) {
            EchoPolyline.push([sighting.lat, sighting.long]);
          } else {
            BetaPolyline.shift();
            BetaPolyline.push([sighting.lat, sighting.long]);
          }
          break;
        case 6:
          if (FoxtrotPolyline.length < 7) {
            FoxtrotPolyline.push([sighting.lat, sighting.long]);
          } else {
            BetaPolyline.shift();
            BetaPolyline.push([sighting.lat, sighting.long]);
          }
          break;
      }
    }
  });

  return (
    <>
      <Polyline positions={AlphaPolyline} pathOptions={{ color: "green" }} />
      <Polyline positions={BetaPolyline} pathOptions={{ color: "violet" }} />
      <Polyline positions={CharliePolyline} pathOptions={{ color: "orange" }} />
      <Polyline positions={DeltaPolyline} pathOptions={{ color: "yellow" }} />
      <Polyline positions={EchoPolyline} pathOptions={{ color: "red" }} />
      <Polyline positions={FoxtrotPolyline} pathOptions={{ color: "blue" }} />
    </>
  );
};
