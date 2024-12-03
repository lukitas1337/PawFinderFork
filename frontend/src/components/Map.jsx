import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// Set up the default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

function Map({ shelters, mapPosition, setActiveStateIndex }) {
  const [MapComponents, setMapComponents] = useState(null);

  useEffect(() => {
    const loadMap = async () => {
      const { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } = await import("react-leaflet");
      await import("leaflet/dist/leaflet.css");
      setMapComponents({ MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent });
    };
    loadMap();
  }, []);

  if (!MapComponents) {
    return <div>Loading map...</div>;
  }

  const { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } = MapComponents;

  function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position, 7);
    return null;
  }

  function DetectClick({ shelters, setActiveStateIndex }) {
    useMapEvent({
      click: (e) => {
        const mapLng = e.latlng.lng.toFixed(0);
        const mapLat = e.latlng.lat.toFixed(0);
        console.log(mapLng);
        console.log(mapLat);
        const shelter = shelters.filter(
          (shelter) =>
            shelter.position.coordinates[1].toFixed(0) == mapLat &&
            shelter.position.coordinates[0].toFixed(0) == mapLng
        );
        setActiveStateIndex(shelters.indexOf(...shelter));
      },
    });
  }

  return (
    <div className="mapContainer w-[80%] md:w-[63%] h-[55rem] rounded-[2rem]">
      <MapContainer
        center={mapPosition}
        zoom={5}
        scrollWheelZoom={true}
        className="h-full rounded-[2rem]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {shelters.map((shelter) => (
          <Marker
            key={shelter._id}
            position={[
              shelter.position.coordinates[1],
              shelter.position.coordinates[0],
            ]}
          >
            <Popup>{shelter.companyName}</Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick
          shelters={shelters}
          setActiveStateIndex={setActiveStateIndex}
        />
      </MapContainer>
    </div>
  );
}

export default Map;
