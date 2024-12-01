import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import PetList from "../components/PetList";
import { useUserAuth } from "../contexts/UserAuthContext";


const ShelterFront = () => {
  const [shelter, setShelter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { user, isAuthenticated } = useUserAuth();

  const styleConfig = [
    { svg: "/images/card_figure_yellow.svg", color: "#FEDB66" }, 
    { svg: "/images/card_figure_red.svg", color: "#FD7E6F" },    
    { svg: "/images/card_figure_green.svg", color: "#BFCF59" },  
  ];
  
  const getStyleForCard = (index) => {
    const rowIndex = Math.floor(index / 3); 
    const columnIndex = index % 3; 
    const styleIndex = (rowIndex + columnIndex) % styleConfig.length;
    return styleConfig[styleIndex];
  };

  useEffect(() => {
    // Fetch shelter data from the server
    const fetchShelterData = async () => {
      try {
        const shelterResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/shelters/${id}` // Adjust endpoint as needed
        );
        setShelter(shelterResponse.data);
   // Fetch pets data from the server
        const petRequests = shelterResponse.data.availablePets.map((petId) =>
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/pets/${petId}`)
        );

        const petResponses = await Promise.all(petRequests);
        const petsData = petResponses.map((res) => res.data);

    // Fetch match score data from the server
        if (isAuthenticated) {
          const matchesResponse = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/matching/user/${user.userId}/scores`,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
          );
          const matchScores = matchesResponse.data.reduce((acc, match) => {
            acc[match.petId] = match.score;
            return acc;
          }, {});

          const petsWithScores = petsData.map((pet) => ({
            ...pet,
            matchScore: matchScores[pet._id] || null,
          }));

          setPets(petsWithScores);
        } else {
          setPets(petsData); 
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch shelter or pet data");
      } finally {
        setLoading(false);
      }
    };

    fetchShelterData();
  }, [id, isAuthenticated, user]);

  if (loading) return <div className="text-center py-10 text-lg">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="bg-[#FAFAF5] min-h-screen w-full">
      <div className="container mx-auto px-[120px] p-6 relative">
        {/* Shelter Info Section */}
        <div className="bg-[#E7E7D6] mt-10 p-10 rounded-[30px] flex flex-col relative">
          <img
            src="/images/Paw_white.png"
            alt="Paw"
            className="absolute top-0 right-0 w-[150px] transform"
          />
          <div className="ml-6">
            <h2 className="text-[36px] font-black uppercase text-dark break-words">
              {shelter.companyName}
            </h2>
            <p className="text-dark text-[16px] break-words mb-6">{shelter.address}</p>
            <div className="flex flex-col md:flex-row mt-4">
              <div className="flex items-start gap-16">
                <div className="flex-1 space-y-2">
                  <p className="text-dark text-[16px]">
                    <strong>Contact Person:</strong> {shelter.contactPerson}
                  </p>
                  <p className="text-dark text-[16px] flex items-center gap-2 whitespace-nowrap">
                    <strong>Email:</strong> {shelter.email}
                  </p>
                </div>
                <div className=" flex-1 space-y-2">
                <p className="text-dark text-[16px] break-words">
                    <strong>Phone:</strong> {shelter.phone}
                  </p>
                  <p className="text-dark text-[16px] flex items-center gap-2 whitespace-nowrap">
                    <strong>Website:</strong>{" "}
                    <a
                      href={shelter.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8D9E29] font-medium hover:underline break-words"
                    >
                      {shelter.website}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Available Pets Section */}
        <div className="mt-14">
          {pets.length > 0 ? (
            <PetList
              pets={pets}
              gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              getStyleForCard={getStyleForCard}
            />
          ) : (
            <div className="text-center text-gray-500">
              No pets available for adoption currently.
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default ShelterFront;