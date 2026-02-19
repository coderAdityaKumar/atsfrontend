import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import ApplicationForm from '../components/ApplicationForm';

function JobDescription() {
  const { careerPageUrl, jobId } = useParams();
  const [job, setJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const isIFrameEnabled = false;

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/jobs/jobDetails',
          {
            params: {
              careerpageurl: careerPageUrl,
              jobId: jobId,
            },
          },
        );
        console.log(response.data);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details', error);
      }
    };
    fetchJobDetail();
  }, []);

  async function handleApply(e) {
    e.preventDefault(); // prevent page reload

    const formData = new FormData();
    formData.append('jobId', id);
    formData.append('firstName', firstName);
    formData.append('middleName', middleName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('mobileNumber', phone);
    formData.append('yearsOfExperience', experience);
    formData.append('skills', skills);
    formData.append('externalProfileUrl', profileUrl);
    formData.append('resume', resume); // file object
    formData.append('coverLetter', coverLetter);

    try {
      const response = await axios.post(
        'http://localhost:8080/applicants/save',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  if (!job)
    return <p className="text-center text-gray-600">Loading job details...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {!isIFrameEnabled && <Header />}

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="bg-zinc-100 p-8 border-b">
            <h1 className="text-3xl font-bold text-gray-900">
              {job.jobProfile}
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              {job.jobType} • {job.jobShift} Shift
            </p>
          </div>

          {/* Body Content */}
          <div className="p-8 space-y-10">
            {/* Description */}
            <section>
              <h2 className="text-xl font-semibold text-blue-600 mb-3">
                Job Description
              </h2>
              <div
                className="prose prose-sm max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: job.jobDescription }}
              />
            </section>

            {/* Salary & Experience */}
            <section className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-100 p-5 rounded-xl border">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  Salary
                </h3>
                <p className="text-gray-800">
                  {job.minSalaryAmount} – {job.maxSalaryAmount}{' '}
                  {job.salaryCurrency}
                </p>
              </div>

              <div className="bg-zinc-100 p-5 rounded-xl border">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  Experience
                </h3>
                <p className="text-gray-800">
                  {job.minExperienceInYears || 'N/A'} –{' '}
                  {job.maxExperienceInYears || 'N/A'} years
                </p>
              </div>
            </section>

            {/* Location */}
            <section>
              <h2 className="text-xl font-semibold text-blue-600 mb-3">
                Location
              </h2>
              {job.jobLocation ? (
                <div className="bg-zinc-100 p-5 rounded-xl border text-gray-700">
                  {job.jobLocation}, {job.jobLocationCity},{' '}
                  {job.jobLocationState}, {job.jobLocationCountry}{' '}
                  {job.jobLocationZipCode}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  Location details not provided
                </p>
              )}
            </section>

            {/* Apply Button */}
            <div className="text-center pt-6">
              <button
                onClick={() => setShowForm(true)}
                className="text-blue-500 border border-blue-500 px-10 py-2 rounded-md hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out text-sm font-semibold"
              >
                Apply Now
              </button>
            </div>

            {showForm && (
              <div className="fixed inset-0 z-10 flex items-center justify-center">
                {/* Overlay */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-50"
                  onClick={() => setShowForm(false)}
                ></div>

                {/* Popup */}
                <div
                  className="relative bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full max-h-screen md:max-h-96 overflow-x-auto transform transition-all duration-300 hover:border hover:border-blue-500 flex flex-col gap-2 m-4"
                >
                  <div className='mb-4 border-b-2'>
                    <h2 className='text-3xl font-bold text-gray-900 text-center'>Join Our Team</h2>
                    <span className='absolute top-3 right-3 cursor-pointer hover:text-red-500' onClick={()=>setShowForm(false)}>X</span>
                  </div>
                  <div>
                    <ApplicationForm />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
