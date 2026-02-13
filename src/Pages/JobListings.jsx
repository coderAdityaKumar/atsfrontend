import axios from 'axios';
import React, { useEffect, useState } from 'react';
import JobCards from '../components/JobCards';
import { useNavigate, useParams } from 'react-router-dom';

function JobListings() {
  const {careerPageUrl}=useParams();
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState(null);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate(); 

  const fetchJobs = async (title = '', location = '') => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/jobs', {
        params: {
          careerpageurl: careerPageUrl,
          page: 0,
          pagesize: 10,
          ...(title !== '' && { jobTitle: title }),
          ...(location !== '' && { location: location }),
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
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Company Info */}
      {company && !company.isIFrameEnabled && (
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6 bg-gray-50 p-4 rounded-lg shadow-md">
          <img
            src={company.logo}
            alt="Company Logo"
            className="h-16 w-16 object-contain mb-4 sm:mb-0"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{company.companyName}</h2>
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline mt-2 block"
            >
              Back to Website
            </a>
          </div>
        </div>
      )}

      {/* Search Filters */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
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
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition"
        >
          Search
        </button>
      </div>

      {/* Job Listings */}
      {loading ? (
        <p className="text-center text-gray-600">Loading jobs...</p>
      ) : jobs.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div key={job.jobId} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <JobCards
                role={job.jobCategory}
                location={job.location}
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