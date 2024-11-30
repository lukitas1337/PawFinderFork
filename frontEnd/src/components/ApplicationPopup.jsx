import { useState } from "react";
import { useUserAuth } from "../contexts/UserAuthContext";
import axios from "axios";

function ApplicationPopup({ pet, onClose }) {
  const { user, isAuthenticated } = useUserAuth();
  const [formData, setFormData] = useState({
    name: user?.fullName || "", //Fake!!!
    email: user?.email || "",  //Fake!!!
    message: "",                //Fake!!!
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated || !user?.userId) {
      alert("Please log in to send an application.");
      return;
    }
   
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.userId}/adoption-applications`,
        { petId: pet._id },
        { withCredentials: true }
      );

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 w-[400px] text-center">
        {!isSubmitted ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Adoption Form</h2>
            <p className="text-sm text-gray-600 mb-6">
              Leave your information and we will contact you.
            </p>
            <p className="text-sm text-gray-600 mb-6">
              You are applying for: <strong>{pet.name}</strong>
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <textarea
                name="message"
                placeholder="Leave a message"
                value={formData.message}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Send Application
              </button>
            </form>
          </>
        ) : (
          <>
            <img
              src="/images/Check_circle_main_page.png"
              alt="Success"
              className="w-12 h-12 mx-auto mb-4"
            />
            <p className="text-lg font-semibold mb-2">
              Your application for <strong>{pet.name}</strong> was sent
              successfully!
            </p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ApplicationPopup;
