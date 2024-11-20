import React, { useState } from "react";
import GetInTouchSection from "../components/GetInTouchSection";
import SendMessageAlert from "../components/SendMessageAlert";
import ContactForm from "../components/ContactForm";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");

    setSuccessMessage("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="bg-[#FAFAF5] min-h-screen flex flex-col items-center relative">
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
