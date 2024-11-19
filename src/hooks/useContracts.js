// src/hooks/useContracts.js
import { useState, useEffect } from 'react';

const useContracts = () => {
  // Track fetched contracts data, loading state, and potential errors
  const [contracts, setContracts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Separate async function to handle contract fetching
    // This prevents useEffect from directly returning a Promise
    const fetchContracts = async () => {
      try {
        // Fallback to localhost if VITE_API_URL is not defined in environment
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

        // Include credentials for authentication and set JSON headers
        // This enables cookies/sessions to be sent with the request
        const response = await fetch(`${baseUrl}/api/v1/contracts/available`, {
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        // Validate response content type to catch non-JSON responses
        // This prevents parsing errors when server returns HTML error pages
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Expected JSON response but received HTML");
        }

        const data = await response.json();
        
        // API returns { success: boolean, data: Contract[], message?: string }
        // Only update state if the request was successful
        if (data.success) {
          setContracts(data.data);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        // Ensure we always have a meaningful error message
        setError(error.message || "Failed to fetch contracts");
      } finally {
        // Always mark loading as complete, regardless of success/failure
        setIsLoading(false);
      }
    };

    fetchContracts();
  }, []); // Empty dependency array means this effect runs once on mount

  return { contracts, isLoading, error };
};

export default useContracts;