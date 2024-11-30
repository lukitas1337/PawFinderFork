import { cloneElement, useEffect, useState } from "react";
import Map from "../components/Map";
import ShelterList from "../components/ShelterList";
import axios from "axios";

function Shelters() {
  const [shelters, setShelters] = useState([]);
  const [activeStateIndex, setActiveStateIndex] = useState(0);
  const [mapPosition, setMapPosition] = useState([
    52.57406013947362, 13.546103696125384,
  ]);

  useEffect(function () {
    async function getShelters() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/shelters`
        );
        setShelters(res.data);
      } catch (error) {
        throw new Error("there was a problem fetching shelters", error);
      }
    }
    getShelters();
  }, []);

  function handleClick(shelter, i) {
    setActiveStateIndex(i);
    setMapPosition([
      shelter.position.coordinates[1],
      shelter.position.coordinates[0],
    ]);
  }

  return (
    <main className="my-[10rem] px-[4rem] py-10">
      <div className="sheltersContainer flex justify-between">
        <ShelterList
          shelters={shelters}
          handleClick={handleClick}
          activeStateIndex={activeStateIndex}
        />
        <Map
          shelters={shelters}
          mapPosition={mapPosition}
          setActiveStateIndex={setActiveStateIndex}
        />
      </div>
    </main>
  );
}

export default Shelters;
