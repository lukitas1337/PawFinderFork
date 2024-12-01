import React, { useState, useEffect } from "react";
import GetInTouchSection from "../components/GetInTouchSection";
import SendMessageAlert from "../components/SendMessageAlert";
import ContactForm from "../components/ContactForm";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [scale, setScale] = useState(1); // Resize the page

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccessMessage("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Resize the page
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth > 1920) {
        setScale(1.5); 
      } else if (screenWidth > 1440) {
        setScale(1.2); 
      } else {
        setScale(1); 
      }
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // Resize the page
    <div
      className="bg-[#FAFAF5] min-h-screen flex flex-col items-center relative"
      style={{
        transform: `scale(${scale})`, 
        transformOrigin: "top center", 
        transition: "transform 0.3s ease", 
      }}
    >
      <SendMessageAlert message={successMessage} />
      <main className="container mx-auto flex flex-col items-center px-40 mt-28">
        <GetInTouchSection />
        <div className="bg-light w-full max-w-[800px] p-12 rounded-[25px] mb-40 shadow-sm">
          <h2 className="text-dark text-[22px] font-semibold mt-4 text-center mb-8">
            Contact us
          </h2>
          <ContactForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </main>
    </div>
  );
}

export default Contact;
