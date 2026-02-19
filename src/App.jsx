import { useState } from 'react';
import './App.css';
import JobListings from './Pages/JobListings';
import { Route, Router, Routes } from 'react-router-dom';
import JobDescription from './Pages/JobDescription';
import { CompanyProvider } from './Context/CompanyContext';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route
        path="/careerPage/:careerPageUrl"
        element={
          <CompanyProvider>
            <JobListings />
          </CompanyProvider>
        }
      />
      <Route
        path="/careerPage/:careerPageUrl/:jobId"
        element={
          <CompanyProvider>
            <JobDescription />
          </CompanyProvider>
        }
      />
    </Routes>
  );
}

export default App;
