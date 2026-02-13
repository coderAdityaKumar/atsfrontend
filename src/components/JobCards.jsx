import React from "react";

function JobCards({ role, location ,onApply}) {

  function handleApplyNow(id){

  }
  return (
    <div
      className="flex flex-col sm:flex-row justify-between items-center 
                    bg-white shadow-md rounded-lg p-4 mb-4 
                    hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex flex-col items-start">
        <h3 className="font-semibold text-lg text-gray-800">{role}</h3>
        <span className="text-gray-500 mt-1 text-center">📍 {location}</span>
      </div>
      <button
        className="mt-3 sm:mt-0 px-4 py-2 text-sm font-medium 
                         text-white bg-blue-600 rounded-full 
                         hover:bg-blue-700 transition-colors duration-300"
      onClick={onApply}>
        Apply Now
      </button>
    </div>
  );
}

export default JobCards;
