import { useState, useEffect } from 'react';
import axios from 'axios';

const ShelterFront = () => {
  const [shelter, setShelter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch shelter data from the server
    const fetchShelterData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shelters/67409ed706c3958d971c411c`); // Adjust endpoint as needed
        setShelter(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch shelter data');
      } finally {
        setLoading(false);
      }
    };

    fetchShelterData();
  }, []);

  if (loading) return <div className="text-center py-10 text-lg">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      {/* Shelter Info Section */}
      <div className="card w-full bg-base-100 shadow-xl mb-6">
        <figure>
          <img
            src={shelter.companyImage || 'https://via.placeholder.com/150'}
            alt={shelter.companyName}
            className="w-full h-48 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold">{shelter.companyName}</h2>
          <p className="text-gray-700">{shelter.description}</p>
          <div className="flex flex-col mt-4 space-y-2">
            <p>
              <strong>Contact Person:</strong> {shelter.contactPerson}
            </p>
            <p>
              <strong>Email:</strong> {shelter.email}
            </p>
            <p>
              <strong>Phone:</strong> {shelter.phone}
            </p>
            <p>
              <strong>Address:</strong> {shelter.address}
            </p>
            <p>
              <strong>Website:</strong>{' '}
              <a href={shelter.website} target="_blank" rel="noopener noreferrer" className="link link-primary">
                {shelter.website}
              </a>
            </p>
            <p>
              <strong>Capacity:</strong> {shelter.capacity} pets
            </p>
          </div>
        </div>
      </div>

      {/* Available Pets Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Available Pets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shelter.availablePets.length > 0 ? (
            shelter.availablePets.map((pet) => (
              <div key={pet._id} className="card bg-base-100 shadow-lg">
                <figure>
                  <img
                    src={pet.pictures?.[0] || 'https://via.placeholder.com/150'}
                    alt={pet.name}
                    className="w-full h-40 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h4 className="card-title">{pet.name}</h4>
                  <p>
                    <strong>Type:</strong> {pet.animalType} ({pet.breed})
                  </p>
                  <p>
                    <strong>Age:</strong> {new Date(pet.age).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Gender:</strong> {pet.gender}
                  </p>
                  <p>
                    <strong>Description:</strong> {pet.description}
                  </p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-sm">View Details</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No pets available for adoption currently.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShelterFront;