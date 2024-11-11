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
        const response = await fetch('/api/v1/contracts/available', {
          credentials: 'include'
        });
        const data = await response.json();
        
        if (data.success) {
          setContracts(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Failed to fetch contracts');
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