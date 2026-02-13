import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function JobDescription() {
  const { careerPageUrl, jobId } = useParams();
  const [job, setJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');

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
    <div className="max-w-4xl mx-auto px-6 py-8 bg-white rounded-lg shadow-lg space-y-6">
      

      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        {/* Job Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {job.jobTitle || job.jobCode}
          </h1>
          <p className="text-sm text-gray-500">
            Category: {job.jobCategory} • Shift: {job.jobShift} • Type:{' '}
            {job.jobType}
          </p>
          <p className="text-sm text-gray-500">
            Posted by {job.recruiterName} • Company: {job.companyName}
          </p>
        </div>

        {/* Organization */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            About Organization
          </h2>
          <p className="text-gray-800 leading-relaxed">
            {job.aboutOrganization}
          </p>
        </div>

        {/* Job Description */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Description
          </h2>
          <div
            className="prose prose-sm text-gray-800"
            dangerouslySetInnerHTML={{ __html: job.jobDescription }}
          />
        </div>

        {/* Salary & Experience */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Salary & Experience
          </h2>
          <p className="text-gray-800">
            {job.minSalaryAmount} – {job.maxSalaryAmount} {job.salaryCurrency} (
            {job.salaryUnit})
          </p>
          <p className="text-gray-800">
            Experience: {job.minExperienceInYears || 'N/A'} –{' '}
            {job.maxExperienceInYears || 'N/A'} years
          </p>
          <p className="text-gray-800">
            Notice Period: {job.noticePeriod || 'Not specified'}
          </p>
        </div>

        {/* Location */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Location</h2>
          {job.jobLocation ? (
            <p className="text-gray-800">
              {job.jobLocation}, {job.jobLocationCity}, {job.jobLocationState},{' '}
              {job.jobLocationCountry} {job.jobLocationZipCode}
            </p>
          ) : (
            <p className="text-gray-500 italic">
              Location details not provided
            </p>
          )}
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact</h2>
          {job.contactPersonName ? (
            <div className="text-gray-800">
              <p>{job.contactPersonName}</p>
              <p>{job.contactEmail}</p>
              <p>{job.contactPhone}</p>
            </div>
          ) : (
            <p className="text-gray-500 italic">
              No contact information available
            </p>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Closing Date: {job.closingDate}</span>
          <span>Status: {job.isActive ? 'Active' : 'Closed'}</span>
          <span>Views: {job.views || 0}</span>
        </div>
      </div>

      {/* Apply Button */}
      <div className="text-center">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition"
        >
          Apply Now
        </button>
      </div>

      {/* Application Form */}
      {showForm && (
        <div className="mt-8 border-t pt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Job Application
          </h2>

          <form className="space-y-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                required
                placeholder="John Doe"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            {/* Middle Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Middle Name
              </label>
              <input
                type="text"
                value={middleName}
                onChange={(e) => {
                  setMiddleName(e.target.value);
                }}
                placeholder="John Doe"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                required
                placeholder="John Doe"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                placeholder="john@example.com"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                required
                placeholder="+91 98765 43210"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <input
                type="Number"
                value={experience}
                onChange={(e) => {
                  setExperience(e.target.value);
                }}
                min={0}
                max={25}
                required
                placeholder="5"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Skills
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => {
                  setSkills(e.target.value);
                }}
                placeholder="e.g., Java, Spring Boot, REST API"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Enter multiple skills separated by commas.
              </span>
            </div>

            {/* Portfolio / GitHub */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Portfolio / GitHub / LinkedIn
              </label>
              <input
                type="url"
                value={profileUrl}
                onChange={(e) => {
                  setProfileUrl(e.target.value);
                }}
                placeholder="https://github.com/username"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Resume (PDF) <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={(e) => {
                  setResume(e.target.files[0]);
                }}
                accept=".pdf"
                required
                className="w-full border rounded-lg p-2 bg-white"
              />
              <p className="text-xs text-gray-500 mt-1">
                Max size: 2MB. PDF format only.
              </p>
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Letter
              </label>
              <textarea
                rows="5"
                value={coverLetter}
                onChange={(e) => {
                  setCoverLetter(e.target.value);
                }}
                placeholder="Briefly explain why you are a good fit for this role..."
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Consent */}
            <div className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1" />
              <p className="text-sm text-gray-600">
                I confirm that the information provided is accurate and I agree
                to be contacted regarding this application.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md transition"
              onClick={(e) => handleApply(e)}
            >
              Submit Application
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default JobDescription;
