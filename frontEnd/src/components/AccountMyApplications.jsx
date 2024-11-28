import React, { useEffect, useState } from "react";
import axios from "axios";

// export default function AccountMyApplications() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

export default function AccountMyApplications() {
  const applications = [
    {
      id: 1,
      name: "Vesta",
      gender: "Female",
      age: "3 months",
      size: "Small",
      breeder: "Bob Hirshy",
      location: "Greenfield, MA",
      image: "https://i.ibb.co/jg5YZqH/a337147e-4d90-42c0-abb5-cd1ee23848f2.jpg", 
    },
  ];

  // const fetchApplications = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  // `${import.meta.env.VITE_BACKEND_URL}/api/users/pets/${user.userId}/application`);
  //     setApplications(response.data);
  //   } catch (err) {
  //     setError(err.message || "Failed to fetch applications");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const deleteApplication = async (petId) => {
  //   try {
  //     await axios.delete(
  // `${import.meta.env.VITE_BACKEND_URL}/api/users/pets/${user.userId}/application`);
  //     setApplications((prev) => prev.filter((app) => app.petId !== petId));
  //   } catch (err) {
  //     alert(err.message || "Failed to delete application");
  //   }
  // };

  // useEffect(() => {
  //   fetchApplications();
  // }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p className="text-red-600">{error}</p>;
  // }

  return (
    <main className="flex-1 p-16 mt-2">
  <h1 className="text-[30px] font-black mb-6">MY APPLICATIONS</h1>
  {applications.length === 0 ? (
    <div>
      <p className="text-[16px] text-dark">
        You don’t have any new applications yet.
      </p>
      <button className="mt-10 bg-dark text-white text-[14px] w-full max-w-[200px] py-4 font-medium 
      rounded-full hover:bg-[#8D9F19] transition">
        Choose a pet
      </button>
    </div>
  ) : (
    <div className="flex flex-col gap-8 mt-12">
      {applications.map((app) => (
        <div key={app.id} className="flex flex-col gap-6 items-start pb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img
              src={app.image}
              alt={app.name}
              className="w-[352px] h-[352px] object-cover rounded-[30px] shadow-md"
            />
            <div className="flex flex-col ml-7 -mt-3 flex-1 gap-2">
              <h2 className="text-[24px] font-black text-dark uppercase">
                {app.name}
              </h2>
              <p className="text-[16px] text-dark">
                <strong>Gender:</strong> {app.gender}
              </p>
              <p className="text-[16px] text-dark">
                <strong>Age:</strong> {app.age}
              </p>
              <p className="text-[16px] text-dark">
                <strong>Size:</strong> {app.size}
              </p>
              <p className="text-[16px] text-dark">
                <strong>Breeder:</strong> {app.breeder}
              </p>
              <p className="text-[16px] text-dark">
                <strong>Location:</strong> {app.location}
              </p>

              <div className="flex flex-col gap-4 mt-32">
                <button className="bg-dark text-white text-[14px] w-full max-w-[200px] py-4 font-medium 
                rounded-full hover:bg-[#8D9F19] transition">
                  More info
                </button>
                <button className="text-dark border border-dark text-[14px] max-w-[200px] py-4 
                font-medium rounded-full hover:bg-red hover:text-white hover:border-red transition">
                  Cancel an adoption
                </button>
              </div>
            </div>
          </div>
          <div className="w-full border-b border-gray-300 mt-14"></div>
        </div>
      ))}
    </div>
  )}
</main>
  );
}
