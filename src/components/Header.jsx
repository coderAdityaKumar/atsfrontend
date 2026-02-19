import React from "react";
import { useCompany } from "../Context/CompanyContext";

function Header() {
  const { company, loading } = useCompany();

  if (loading) return null;

  return (
    <div className="p-4 flex justify-between h-20 items-center mb-4 border border-b-2">
      <div className="flex pt-2 items-center h-20">
        <img
          src={company.logo}
          alt="Company Logo"
          className="h-10 w-10 rounded-full object-contain mb-4 sm:mb-0 transition-transform duration-300 hover:scale-105"
        />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight text-center sm:text-left">
          {company.companyName}
        </h2>
      </div>

      
      <div className="mt-4 sm:mt-0">
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 text-sm font-semibold border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg shadow transition duration-300 ease-in-out cursor-pointer"
        >
          Back to Website
        </a>
      </div>
    </div>
  );
}

export default Header;