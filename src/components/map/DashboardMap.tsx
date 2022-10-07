import { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export const DashboardMap: FC = () => {
  return (
    <MapContainer
      center={[52.131527702721186, 5.949377035198454]}
      zoom={9}
      scrollWheelZoom={false}
      className="leaflet-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.80582, 5.74468]} />
      <Marker position={[51.88145, 5.70039]} />
      <Marker position={[52.01597, 5.98432]} />
      <Marker position={[51.87437, 6.46374]} />
      <Marker position={[52.00796, 6.14605]} />
    </MapContainer>
  );
};
