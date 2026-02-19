import React from "react";

function JobCards({ role,minExperienceInYears,maxExperienceInYears, jobLocationCity, postedOnDate ,onApply}) {
  const skills=["Javascript","React","Nodejs"];
  console.log(jobLocationCity);
  return (
    <div className="mx-1 md:mx-5 mb-4">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-zinc-100 rounded-md border border-black shadow-lg hover:border-blue-500 gap-4">
        <div className="flex flex-col items-start gap-3 ">
          <h1 className="text-lg font-semibold">{role}</h1>
          <p>Full Time · {minExperienceInYears}-{maxExperienceInYears} YOE · {jobLocationCity}</p>
          
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row">
            <p className="text-gray-500">Posted on : {postedOnDate}</p>
            <button onClick={onApply} className="text-blue-500 border border-blue-500 px-10 py-2 rounded-md hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out text-sm font-semibold">Apply</button>
        </div>
      </div>
    </div>
  );
}

export default JobCards;
