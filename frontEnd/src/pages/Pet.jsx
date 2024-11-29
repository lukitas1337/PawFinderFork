import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Pet() {
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const [images, setImages] = useState([]);
  const [curImage, setCurImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      async function getPet() {
        try {
          setLoading(true);
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/pets/${id}`
          );
          setPet(res.data);
          setImages(res.data.pictures || []);
          setCurImage(res.data.pictures?.[0]);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      }
      getPet();
    },
    [id]
  );

  const calculateAge = (birthDate) => {
    const now = new Date();
    const birth = new Date(birthDate);

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    return years > 0
      ? `${years} year${years > 1 ? "s" : ""}`
      : `${months} month${months > 1 ? "s" : ""}`;
  };

  function handleCurImage(img) {
    const index = images.indexOf(img.src);
    setCurImage(images[index]);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pet) return <div>Pet not found</div>;

  console.log(Date(pet.age));
  return (
    <div className="flex w-full my-[10rem] px-[4rem] py-10 mx-auto gap-[15rem]">
      <div className="petImages w-[40%]">
        <figure className="w-full">
          <img src={curImage} alt="dog" className="w-full rounded-[5rem]" />
        </figure>
        <div className="flex gap-[3rem] w-full">
          {images.map((img) => (
            <img
              src={img}
              alt={pet.name}
              key={img}
              className="w-[10rem] h-[10rem] mt-[8rem] rounded-[1.5rem]"
              onClick={(e) => handleCurImage(e.target)}
            />
          ))}
        </div>
      </div>
      <div className="dogInfo flex flex-col gap-[5rem] w-[40%]  ">
        <div className="flex flex-col gap-[1rem] ">
          <h2 className="text-[4rem] font-bold">{pet.name}</h2>
          <p className="text-[2rem]">{pet.breed}</p>
          <p className="text-[2rem]">
            {pet.gender}.{calculateAge(pet.age)}.{pet.size}
          </p>
          <p className="text-[2rem]">{pet.location}</p>
        </div>
        <div className="w-full h-[1px] bg-slate-700"></div>
        <div className="flex flex-col gap-[1rem]">
          <h3 className="text-[2rem] font-bold uppercase">About Me</h3>
          <div className="text-[2rem] flex flex-col gap-[1rem]">
            <p className="flex gap-[5rem]">
              <span>{pet.vaccinated ? "✔️ Vaccinated" : "❌ Vaccinated"}</span>
              <span>{pet.neutured ? "✔️ Neutured" : "❌ Neutuered"}</span>
            </p>
            <p className="flex gap-[6.7rem]">
              <span>{pet.microchipped ? "✔️ Microchip" : "❌ Microchip"}</span>
              <span>
                {pet.sociableWithOtherPets
                  ? "✔️ Friendly with other pets"
                  : "❌ Friendly with other pets"}
              </span>
            </p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-slate-700"></div>
        <div className="dogStory">
          <h3 className="text-[2rem] font-bold uppercase">My Story</h3>
          <p className="text-justify text-[1.6rem]">
            {pet.petStory.split("<br/>")[0]} <br />{" "}
            {pet.petStory.split("<br/>")[1]}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Pet;
