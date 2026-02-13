import { useState } from 'react';
import './App.css';
import JobListings from './Pages/JobListings';
import { Route, Router, Routes } from 'react-router-dom';
import JobDescription from './Pages/JobDescription';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/careerPage/:careerPageUrl" element={<JobListings />} />
      <Route path="/careerPage/:careerPageUrl/:jobId" element={<JobDescription />} />
    </Routes>
  );
}

export default App;
