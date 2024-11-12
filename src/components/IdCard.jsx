import React, { useEffect, useState } from 'react';
import { getId } from '../api/base-api.mjs';
import labelMapping from '../utilities/labelMapping';
import { formatDate } from '../utilities/formatDate';
import { Stamp } from './Stamp';

export const IdCard = ({ id }) => {
  const [identity, setidentity] = useState({});

  useEffect(() => {
    const fetchId = async () => {
      try {
        const response = await getId({ legalId: id });
        if (response.success) {
          setidentity(response.data.Identity);
        }
      } catch (error) {}
    };
    fetchId();
  }, []);

  const renderStamp = (state) => {
    switch (state.toLowerCase()) {
      case 'approved':
        return <Stamp status="Approved" state="active" />;
      case 'created':
        return <Stamp status="Pending" state="pending" />;
      default:
        return <Stamp status="Canceled" state="inactive" />;
    }
  };

  return (
    <div className="id-card shadow__general">
      {identity?.status?.state && renderStamp(identity?.status?.state)}
      <ul>
        {identity.status && (
          <li>
            <span className="id-card__label">Created</span>
            <span className="id-card__value">
              {formatDate(identity.status.created)}
            </span>
          </li>
        )}
        {identity.id && (
          <li>
            <span className="id-card__label">Identity</span>
            <span className="id-card__value">{identity.id}</span>
          </li>
        )}
        {identity.property &&
          identity.property.map((property, index) => {
            return (
              <li key={index}>
                <span className="id-card__label">
                  {labelMapping[property.name] || property.name}
                </span>
                <span className="id-card__value">{property.value}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
