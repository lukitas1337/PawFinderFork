import React from "react";

export default function AccountMyApplications() {
  return (
    <main className="flex-1 p-14 -mt-16">
      <h1 className="text-[30px] font-black mb-6">MY APPLICATIONS</h1>
      <p className="text-[16px] text-dark">You don’t have any new applications yet.</p>
      <button className="mt-10 bg-dark text-white text-[14px] w-full max-w-[200px] py-4 font-medium rounded-full hover:bg-[#8D9F19] transition">
        Choose a pet
      </button>
    </main>
  );
}
