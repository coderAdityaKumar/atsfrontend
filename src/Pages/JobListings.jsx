import axios from 'axios';
import React, { useEffect, useState } from 'react';
import JobCards from '../components/JobCards';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';

function JobListings() {
  const { careerPageUrl } = useParams();
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState(null);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate();
  const isIFrameEnabled=false;

  const fetchJobs = async (title = '', location = '') => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/jobs', {
        params: {
          careerpageurl: careerPageUrl,
          page: 0,
          pagesize: 10,
          ...(title !== '' && { jobTitle: title }),
          ...(location !== '' && { jobLocationCity: location }),
        },
      });
      setJobs(response.data.jobs);
      setCompany({
        companyName: response.data.companyName,
        logo: response.data.logo,
        website: response.data.website,
        // isIFrameEnabled: response.data.isIFrameEnabled,
        // careerPageUrl: response.data.careerPageUrl,
      });
      console.log(response);
    } catch (error) {
      console.error('Error fetching jobs', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  function handleApply(id) {
    navigate(`/careerPage/${careerPageUrl}/${id}`);
  }

  return (
    <div className="">
      {/* Company Info */}
      {!isIFrameEnabled && (
        <Header />
      )}

      {/* Search Filters */}
      <div className="max-w-6xl  mx-auto flex flex-col sm:flex-row sm:space-x-4 px-4 space-y-3 sm:space-y-0">
        <input
          type="text"
          placeholder="Search by Job Title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="border rounded-lg p-2 flex-1 focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Search by Location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="border rounded-lg p-2 flex-1 focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={() => fetchJobs(searchTitle, searchLocation)}
          className="hover:bg-blue-500 border border-blue-500 text-blue-500 hover:text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out text-sm font-semibold"
        >
          Search
        </button>
      </div>

      {/* Job Listings */}
      {loading ? (
        <p className="text-center text-gray-600">Loading jobs...</p>
      ) : jobs.length > 0 ? (
        <div className="max-w-6xl  mx-auto ">
          {jobs.map((job) => (
            <div
              key={job.jobId}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition px-4"
            >
              <JobCards
                role={job.jobCategory}
                minExperienceInYears={job.minExperienceInYears}
                maxExperienceInYears={job.maxExperienceInYears}
                jobLocationCity={job.jobLocationCity}
                postedOnDate={job.postedOnDate}
                onApply={() => handleApply(job.jobId)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No jobs found</p>
      )}
    </div>
  );
}

export default JobListings;
