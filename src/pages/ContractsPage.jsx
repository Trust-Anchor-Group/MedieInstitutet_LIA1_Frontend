// src/pages/ContractsPage.jsx

import React, { useEffect, useState } from 'react';
import { LoadingScreen } from '../components/LoadingScreen';

const ContractsPage = () => {
  const [contracts, setContracts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        console.log('Fetching contracts from:', `${baseUrl}/api/v1/contracts/available`);
        
        const response = await fetch(`${baseUrl}/api/v1/contracts/available`, {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        
        // Check if response is actually JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Received non-JSON response:', text);
          throw new Error('Expected JSON response but received HTML');
        }

        const data = await response.json();
        console.log('Response data:', data);
        
        if (data.success) {
          setContracts(data.data);
        } else {
          console.error('API returned error:', data.message);
          setError(data.message);
        }
      } catch (error) {
        console.error('Error fetching contracts:', error);
        setError('Failed to fetch contracts: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContracts();
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="page__container">
      <section className="contracts__section">
        <h1>Available Contracts</h1>
        
        {error && (
          <div className="feedback feedback-error">
            {error}
          </div>
        )}

        <div className="contracts__grid">
          {contracts.map((contract, index) => (
            <div key={index} className="contract-card">
              <div className="contract-card__header">
                <h3>Contract Template {index + 1}</h3>
              </div>
              <div className="contract-card__content">
                <p>ID: {contract.id}</p>
                <p>
                  Status: 
                  <span className={`status status--${contract.status?.toLowerCase() || 'pending'}`}>
                    {contract.status || 'N/A'}
                  </span>
                </p>
                {contract.description && (
                  <p>{contract.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContractsPage;