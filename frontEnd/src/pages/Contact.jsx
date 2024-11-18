import React, { useState } from "react";

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
      {successMessage && (
  <div
    className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white text-dark px-12 py-8 rounded-lg shadow-lg z-50 flex items-center space-x-6"
  >
    <img
      src="/images/Check_circle_main page.png"
      alt="Check"
      className="h-10 w-10"
    />
    <span className="text-[14px] ml-2 font-medium">{successMessage}</span>
  </div>
)}

      <main className="container mx-auto flex flex-col items-center px-40 mt-28">
        <div className="relative flex flex-col items-center md:flex-row md:justify-between w-full">
          <div className="text-center md:text-left md:w-1/2 pl-56">
            <h1 className="text-dark leading-[80px] text-4xl font-poppins font-black text-[70px] relative">
              GET IN <br />TOUCH

              <img
                src="/images/paw_icon_green_main page.png"
                alt="Overlay"
                className="absolute -top-14 left-80 w-[70px] h-auto pointer-events-none"
              />
            </h1>
          </div>
          <div className="md:w-1/2 flex justify-center pr-[140px] mt-8 md:mt-0">
            <img
              src="/images/Cat_contact_form.png"
              alt="Cat with mustache"
              className="w-[300px] h-auto"
            />
          </div>
        </div>

        <div className="bg-light w-full max-w-[800px] p-12 rounded-[25px] mb-40 shadow-sm">
          <h2 className="text-dark text-[22px] font-semibold mt-4 text-center mb-8">
            Contact us
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="ml-8 block text-dark font-bold text-[14px] mb-2"
              >
                Name
              </label>
              <div>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark placeholder:text-[#B1B5B7]  
                  placeholder:font-light rounded-full focus:border-[#809309] focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] 
                  transition duration-300 mb-8 h-[46px]"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="ml-8 block text-dark font-bold text-[14px] mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark placeholder:text-[#B1B5B7]  
                  placeholder:font-light rounded-full focus:border-[#809309] focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] 
                  transition duration-300 mb-8 h-[46px]"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="ml-8 block text-dark font-bold text-[14px] mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter your message"
                className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark placeholder:text-[#B1B5B7] 
                  placeholder:font-light rounded-[24px] focus:border-[#809309] focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] 
                  transition duration-300 h-80 mb-12"
              ></textarea>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-dark text-white text-[14px] w-full max-w-[200px] py-4 font-medium rounded-full hover:bg-[#8D9F19] transition"
              >
                Send a message
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Contact;
