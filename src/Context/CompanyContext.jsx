import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const CompanyContext = createContext(null);

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
};

export const CompanyProvider = ({ children }) => {
  const { careerPageUrl } = useParams(); 
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get("http://localhost:8080/companyDetails", {
          params:{
            careerPageUrl:careerPageUrl
          },
        });
        
        setCompany(response.data); 
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch company details", error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [careerPageUrl]);

  return (
    <CompanyContext.Provider value={{ company, loading }}>
      {children}
    </CompanyContext.Provider>
  );
};