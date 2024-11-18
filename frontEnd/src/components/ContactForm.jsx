import React from "react";

const ContactForm = ({ formData, handleInputChange, handleSubmit }) => {
  return (
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
            className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark 
            placeholder:text-[#B1B5B7] placeholder:font-light rounded-full focus:border-[#809309] 
            focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] transition duration-300 mb-8 h-[46px]"
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
          className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark 
          placeholder:text-[#B1B5B7] placeholder:font-light rounded-full focus:border-[#809309] focus:text-dark 
          focus:ring-0 focus:outline-none focus:border-[2px] transition duration-300 mb-8 h-[46px]"
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
          className="w-full px-8 py-4 border border-dark bg-[#FAFAF5] text-[16px] font-normal text-dark 
          placeholder:text-[#B1B5B7] placeholder:font-light rounded-[24px] focus:border-[#809309] 
          focus:text-dark focus:ring-0 focus:outline-none focus:border-[2px] transition duration-300 h-80 mb-12"
        ></textarea>
      </div>
      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="bg-dark text-white text-[14px] w-full max-w-[200px] py-4 font-medium rounded-full 
          hover:bg-[#8D9F19] transition"
        >
          Send a message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
