// src/pages/ContractsPage.jsx

import React, { useEffect, useState } from "react";
import { LoadingScreen } from "../components/LoadingScreen";
import { Info } from 'lucide-react';  // Changed to lucide-react

const ContractsPage = () => {
  const [contracts, setContracts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
        console.log(
          "Fetching contracts from:",
          `${baseUrl}/api/v1/contracts/available`
        );

        const response = await fetch(`${baseUrl}/api/v1/contracts/available`, {
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        console.log("Response status:", response.status);
        console.log(
          "Response headers:",
          Object.fromEntries(response.headers.entries())
        );

        // Check if response is actually JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          console.error("Received non-JSON response:", text);
          throw new Error("Expected JSON response but received HTML");
        }

        const data = await response.json();
        console.log("Response data:", data);

        if (data.success) {
          setContracts(data.data);
        } else {
          console.error("API returned error:", data.message);
          setError(data.message);
        }
      } catch (error) {
        console.error("Error fetching contracts:", error);
        setError("Failed to fetch contracts: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContracts();
  }, []);

  if (isLoading) return <LoadingScreen />;

  const formatContractInfo = (contract) => {
    const parameters = contract.Contract?.parameters;
    return {
      technicalInfo: {
        id: contract.Contract?.id,
        archiveOpt: contract.Contract?.archiveOpt,
        archiveReq: contract.Contract?.archiveReq,
        duration: contract.Contract?.duration,
        visibility: contract.Contract?.visibility,
        canActAsTemplate: contract.Contract?.canActAsTemplate,
      },
      loanInfo: {
        amount:
          parameters?.numericalParameter?.find((p) => p.name === "Amount")
            ?.value || "N/A",
        currency: parameters?.stringParameter?.value || "USD",
        installmentAmount:
          parameters?.numericalParameter?.find(
            (p) => p.name === "InstallmentAmount"
          )?.value || "N/A",
        interestRate:
          parameters?.numericalParameter?.find(
            (p) => p.name === "InterestPerInstallment"
          )?.value || "N/A",
        debtLimit:
          parameters?.numericalParameter?.find((p) => p.name === "DebtLimit")
            ?.value || "N/A",
        commission:
          parameters?.numericalParameter?.find(
            (p) => p.name === "CommissionPercent"
          )?.value || "N/A",
        installmentInterval: parameters?.durationParameter?.value || "N/A",
      },
    };
  };

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
          {contracts.map((contract, index) => {
            const info = formatContractInfo(contract);
            const isTemplate = contract.Contract?.canActAsTemplate === 'true';
            
            return (
              <div key={index} className="contract-card">
                <div className="contract-card__header">
                  <h3>
                    {contract.Contract?.Create?.FriendlyName?.String?.value || 'Contract'}
                    {isTemplate && <span className="template-badge">Template</span>}
                  </h3>
                  <div className="info-icon" title="Contract Details">
                    <Info size={20} />
                    <div className="info-tooltip">
                      <p><strong>ID:</strong> {info.technicalInfo.id}</p>
                      <p><strong>Duration:</strong> {info.technicalInfo.duration}</p>
                      <p><strong>Archive Required:</strong> {info.technicalInfo.archiveReq}</p>
                      <p><strong>Archive Optional:</strong> {info.technicalInfo.archiveOpt}</p>
                      <p><strong>Visibility:</strong> {info.technicalInfo.visibility}</p>
                    </div>
                  </div>
                </div>

                <div className="contract-card__content">
                  <div className="loan-details">
                    <div className="loan-detail">
                      <span className="label">Loan Amount:</span>
                      <span className="value">{info.loanInfo.amount} {info.loanInfo.currency}</span>
                    </div>
                    <div className="loan-detail">
                      <span className="label">Installment Amount:</span>
                      <span className="value">{info.loanInfo.installmentAmount} {info.loanInfo.currency}</span>
                    </div>
                    <div className="loan-detail">
                      <span className="label">Interest Rate:</span>
                      <span className="value">{info.loanInfo.interestRate}%</span>
                    </div>
                    <div className="loan-detail">
                      <span className="label">Debt Limit:</span>
                      <span className="value">{info.loanInfo.debtLimit} {info.loanInfo.currency}</span>
                    </div>
                    <div className="loan-detail">
                      <span className="label">Commission:</span>
                      <span className="value">{info.loanInfo.commission}%</span>
                    </div>
                    <div className="loan-detail">
                      <span className="label">Payment Interval:</span>
                      <span className="value">{info.loanInfo.installmentInterval}</span>
                    </div>
                  </div>
                  
                  <div className="contract-status">
                    <span className={`status status--${contract.Contract?.status?.state?.toLowerCase() || 'pending'}`}>
                      {contract.Contract?.status?.state || 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ContractsPage;