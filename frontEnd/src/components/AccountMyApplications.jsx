import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserAuth } from "../contexts/UserAuthContext";

export default function AccountMyApplications() {
  const { user, isAuthenticated } = useUserAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET-запрос для получения заявок
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

  // DELETE-запрос для удаления заявки
  const handleCancelAdoption = async (petId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.userId}/adoption-applications`,
        {
          data: { petId }, // Передаем ID питомца в тело запроса
          withCredentials: true,
        }
      );
      // Удаляем заявку из локального состояния
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
            <div key={app._id} className="flex flex-col gap-6 items-start pb-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img
                  src={app.pictures[0]}
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
                    <strong>Location:</strong> {app.location}
                  </p>

                  <div className="flex flex-col gap-4 mt-32">
                    <button className="bg-dark text-white text-[14px] w-full max-w-[200px] py-4 font-medium 
                    rounded-full hover:bg-[#8D9F19] transition">
                      More info
                    </button>
                    <button
                      onClick={() => handleCancelAdoption(app._id)}
                      className="text-dark border border-dark text-[14px] max-w-[200px] py-4 
                      font-medium rounded-full hover:bg-red hover:text-white hover:border-red transition"
                    >
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
