import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ApplicationForm() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [fileName, setFileName] = useState('');
  const [fileData, setFileData] = useState('');
  const { careerPageUrl } = useParams();
  const { jobId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/screeningQuestions',
          {
            params: { careerPageUrl, jobId },
          },
        );
        setQuestions(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [careerPageUrl, jobId]);

  function handleFileChange(e) {
    const file = e.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = function (event) {
      setFileData(event.target.result);
    };
    reader.readAsDataURL(file);
  }

  function handleInputChange(id, value) {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const answerArray = questions.map((q) => ({
      questionBankId: q.id,
      answer: answers[q.id],
    }));
    const payload = {
      jobId: jobId,
      fileName: fileName,
      fileData: fileData,
      source: careerPageUrl,
      questions: answerArray,
    };
    console.log(payload);
  }

  return (
    <form
      className="space-y-6 w-full"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      {questions.map((question, index) => {
        return (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {question.question}
            </label>
            {question.type === 'INPUT_TYPE' && (
              <input
                type="text"
                className="w-full h-10 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                id={question.id}
                value={answers[question.id] || ''}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
              />
            )}

            {question.type === 'YES_NO_TYPE' && (
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    name={question.type}
                    value="Yes"
                    onChange={(e) => {
                      handleInputChange(question.id, e.target.value);
                    }}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name={question.type}
                    value="No"
                    onChange={(e) => {
                      handleInputChange(question.id, e.target.value);
                    }}
                    value={answers[question.id] || ''}
                  />
                  No
                </label>
              </div>
            )}
          </div>
        );
      })}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Upload your resume
      </label>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          handleFileChange(e);
        }}
      />
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full hover:bg-blue-500 border border-blue-500 text-blue-500 hover:text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out text-sm font-semibold"
      >
        Submit Application
      </button>
    </form>
  );
}

export default ApplicationForm;
