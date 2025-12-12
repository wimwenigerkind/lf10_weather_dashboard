import type {citySearchResult} from "../types/citySearchResult.ts";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';

export default function CityMap({city}: {city: citySearchResult}) {
  return (
    <MapContainer center={[city.latitude, city.longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[city.latitude, city.longitude]}>
        <Popup>
          {city.name || 'City Location'}
        </Popup>
      </Marker>
    </MapContainer>
  )
}