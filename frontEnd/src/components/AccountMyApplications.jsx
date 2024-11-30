import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserAuth } from "../contexts/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function AccountMyApplications() {
  const { user, isAuthenticated } = useUserAuth();
  const [applications, setApplications] = useState([]);
  const [shelterData, setShelterData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchApplications = async () => {
    if (!isAuthenticated || !user?.userId) {
      setError("You must be logged in to view applications.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.userId}/adoption-applications`,
        { withCredentials: true }
      );
      setApplications(response.data);
// Fetch shelter data for each application
const shelterResponses = await Promise.all(
  response.data.map((app) =>
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shelters/${app.ownerId}`, {
      withCredentials: true,
    })
  )
);

// Map shelter data by shelter ID
const shelters = shelterResponses.reduce((acc, res) => {
  acc[res.data._id] = res.data.companyName; // Store shelter name by ID
  return acc;
}, {});

setShelterData(shelters);
} catch (err) {
setError("Failed to fetch applications. Please try again later.");
console.error(err);
} finally {
setLoading(false);
}
};

  useEffect(() => {
    fetchApplications();
  }, []);

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

  const handleCancelAdoption = async (petId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.userId}/adoption-applications`,
        {
          data: { petId },
          withCredentials: true,
        }
      );
      setApplications((prev) => prev.filter((app) => app._id !== petId));
    } catch (err) {
      console.error("Failed to cancel adoption:", err);
      alert("Failed to cancel adoption. Please try again.");
    }
  };

  if (loading) {
    return (
      <main className="flex-1 p-16 mt-2">
        <h1 className="text-[30px] font-black mb-6">MY APPLICATIONS</h1>
        <p className="text-[16px] text-dark">Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 p-16 mt-2">
        <h1 className="text-[30px] font-black mb-6">MY APPLICATIONS</h1>
        <p className="text-[16px] text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="flex-1 p-16 mt-2">
      <h1 className="text-[30px] font-black mb-6">MY APPLICATIONS</h1>
      {applications.length === 0 ? (
        <div>
        <p className="text-[16px] text-dark">
          You don’t have any new applications yet
        </p>
        <button
          onClick={() => navigate("/pets")}
          className="mt-10 bg-dark text-white text-[14px] w-full max-w-[200px] py-4 font-medium 
          rounded-full hover:bg-[#8D9F19] transition"
        >
          Choose a pet
        </button>
      </div>
      ) : (
        <div className="flex flex-col gap-8 mt-12">
          {applications.map((app) => {
          const pet = app; 
          
          return (
            <div
              key={pet._id}
              className="bg-[#EEEEE3] rounded-[30px] mr-[160px]"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img
                  src={pet.pictures[0]}
                  alt={pet.name}
                  className="w-[352px] h-[352px] object-cover rounded-tl-[30px] rounded-bl-[30px] rounded-br-none 
                  rounded-tr-none"
                />
                <div className="flex flex-col ml-7 mt-8 flex-1 gap-2">
                  <h2 className="text-[24px] font-black text-dark uppercase">
                    {pet.name}
                  </h2>
                  <p className="text-[16px] text-dark">
                    <strong>Gender:</strong> {pet.gender}
                  </p>
                  <p className="text-[16px] text-dark">
                    <strong>Age:</strong> {calculateAge(pet.age)}
                  </p>
                  <p className="text-[16px] text-dark">
                    <strong>Size:</strong> {pet.size}
                  </p>
                  
                  <p className="text-[16px] text-dark">
                    <strong>Shelter:</strong>{" "}
                    {shelterData[pet.ownerId] ? (
                    <Link 
                    to={`/shelters/${pet.ownerId}`} 
                    className="text-[#8D9E29] hover:underline font-semibold"
                     >
                    {shelterData[pet.ownerId]}
                    </Link>
                    ) : (
                   <span className="text-gray-500">Unknown</span>
                   )}
                  </p>
            
                  <p className="text-[16px] text-dark">
                    <strong>Location:</strong> {pet.location}
                  </p>
                  <div className="flex flex-col gap-4 mt-12">
                    <button
                      onClick={() => navigate(`/pets/${pet._id}`)}
                      className="bg-dark text-white text-[14px] w-full max-w-[200px] py-4 font-medium 
                      rounded-full hover:bg-[#8D9F19] transition"
                    >
                      More info
                    </button>
                    <button
                      onClick={() => handleCancelAdoption(pet._id)}
                      className="text-dark border border-dark text-[14px] max-w-[200px] py-4 
                      font-medium rounded-full hover:bg-red hover:text-white hover:border-red transition"
                    >
                      Cancel an adoption
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </main>
  );
}
